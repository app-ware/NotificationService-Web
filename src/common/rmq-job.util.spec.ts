import type { RmqContext } from '@nestjs/microservices';
import type { PinoLogger } from 'nestjs-pino';
import { runRmqJob } from './rmq-job.util';

describe('runRmqJob', () => {
  const message = { fields: { deliveryTag: 7 } };
  let channel: { ack: jest.Mock; nack: jest.Mock };
  let logger: { error: jest.Mock };
  let context: RmqContext;

  beforeEach(() => {
    channel = { ack: jest.fn(), nack: jest.fn() };
    logger = { error: jest.fn() };
    context = {
      getChannelRef: () => channel,
      getMessage: () => message,
      getPattern: () => 'email.send',
    } as unknown as RmqContext;
  });

  it('waits for all job work before acknowledging exactly once', async () => {
    let finish!: () => void;
    const work = jest.fn(
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );

    const running = runRmqJob(
      context,
      logger as unknown as PinoLogger,
      'job-7',
      work,
    );
    expect(work).toHaveBeenCalledTimes(1);
    expect(channel.ack).not.toHaveBeenCalled();
    finish();
    await running;

    expect(channel.ack).toHaveBeenCalledTimes(1);

    expect(channel.ack).toHaveBeenCalledWith(message);
    expect(channel.nack).not.toHaveBeenCalled();
  });

  it.each(['job-7', undefined])(
    'dead-letters rejected work with requeue disabled for jobId=%s',
    async (jobId) => {
      const failure = new Error('delivery failed');
      const work = jest.fn().mockRejectedValue(failure);

      await expect(
        runRmqJob(context, logger as unknown as PinoLogger, jobId, work),
      ).resolves.toBeUndefined();

      expect(work).toHaveBeenCalledTimes(1);
      expect(channel.ack).not.toHaveBeenCalled();
      expect(channel.nack).toHaveBeenCalledTimes(1);
      expect(channel.nack).toHaveBeenCalledWith(message, false, false);
      expect(logger.error).toHaveBeenCalledWith(
        { err: failure, jobId, pattern: 'email.send' },
        'Job failed - dead-lettered.',
      );
    },
  );

  it('does not reject completed work when its original channel closes before acknowledgement', async () => {
    const closedChannel = new Error('Channel closed');
    channel.ack.mockImplementation(() => {
      throw closedChannel;
    });
    const work = jest.fn().mockResolvedValue(undefined);

    await expect(
      runRmqJob(context, logger as unknown as PinoLogger, 'job-7', work),
    ).resolves.toBeUndefined();

    expect(work).toHaveBeenCalledTimes(1);
    expect(channel.ack).toHaveBeenCalledTimes(1);
    expect(channel.nack).not.toHaveBeenCalled();
    expect(logger.error).toHaveBeenCalledWith(
      { err: closedChannel, jobId: 'job-7', pattern: 'email.send' },
      'Job completed, but acknowledgement failed. RabbitMQ may redeliver the job.',
    );
  });

  it('preserves the work failure when a closed channel also prevents dead-lettering', async () => {
    const failure = new Error('delivery failed');
    const closedChannel = new Error('Channel closed');
    channel.nack.mockImplementation(() => {
      throw closedChannel;
    });

    await expect(
      runRmqJob(
        context,
        logger as unknown as PinoLogger,
        'job-7',
        jest.fn().mockRejectedValue(failure),
      ),
    ).resolves.toBeUndefined();

    expect(channel.ack).not.toHaveBeenCalled();
    expect(channel.nack).toHaveBeenCalledTimes(1);
    expect(channel.nack).toHaveBeenCalledWith(message, false, false);
    expect(logger.error).toHaveBeenCalledTimes(1);
    expect(logger.error).toHaveBeenCalledWith(
      {
        err: failure,
        nackError: closedChannel,
        jobId: 'job-7',
        pattern: 'email.send',
      },
      'Job failed, but rejection failed. RabbitMQ may redeliver the job.',
    );
  });

  it('settles an in-flight delivery only on its original channel after reconnecting', async () => {
    const originalChannel = channel;
    const closedChannel = new Error('Channel closed');
    let finish!: () => void;
    const running = runRmqJob(
      context,
      logger as unknown as PinoLogger,
      'job-7',
      () =>
        new Promise<void>((resolve) => {
          finish = resolve;
        }),
    );
    originalChannel.ack.mockImplementation(() => {
      throw closedChannel;
    });
    channel = { ack: jest.fn(), nack: jest.fn() };

    finish();
    await running;

    expect(originalChannel.ack).toHaveBeenCalledWith(message);
    expect(originalChannel.nack).not.toHaveBeenCalled();
    expect(channel.ack).not.toHaveBeenCalled();
    expect(channel.nack).not.toHaveBeenCalled();

    await runRmqJob(
      context,
      logger as unknown as PinoLogger,
      'job-7',
      async () => {},
    );
    expect(channel.ack).toHaveBeenCalledWith(message);
    expect(channel.nack).not.toHaveBeenCalled();
  });
});
