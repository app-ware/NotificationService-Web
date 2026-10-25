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
    const work = jest.fn(() => new Promise<void>(resolve => { finish = resolve; }));

    const running = runRmqJob(context, logger as unknown as PinoLogger, 'job-7', work);
    expect(work).toHaveBeenCalledTimes(1);
    expect(channel.ack).not.toHaveBeenCalled();
    finish();
    await running;

    expect(channel.ack).toHaveBeenCalledTimes(1);

    expect(channel.ack).toHaveBeenCalledWith(message);
    expect(channel.nack).not.toHaveBeenCalled();
  });

  it.each(['job-7', undefined])('dead-letters rejected work with requeue disabled for jobId=%s', async (jobId) => {
    const failure = new Error('delivery failed');
    const work = jest.fn().mockRejectedValue(failure);

    await expect(runRmqJob(context, logger as unknown as PinoLogger, jobId, work)).resolves.toBeUndefined();

    expect(work).toHaveBeenCalledTimes(1);
    expect(channel.ack).not.toHaveBeenCalled();
    expect(channel.nack).toHaveBeenCalledTimes(1);
    expect(channel.nack).toHaveBeenCalledWith(message, false, false);
    expect(logger.error).toHaveBeenCalledWith({ err: failure, jobId, pattern: 'email.send' }, 'Job failed - dead-lettered.');
  });
});
