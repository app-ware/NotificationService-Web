import type { RmqContext } from '@nestjs/microservices';
import type { PinoLogger } from 'nestjs-pino';
import type { EmailJob } from '../../config/rabbitmq/contracts/email-job';
import type { MailService } from './mail.service';
import type { MailResultPublisher } from './mail-result.publisher';
import { PATTERNS } from '../../config/rabbitmq/rabbitmq.constants';

// The controller's transport contract can be tested without constructing Resend.
jest.mock('./mail.service', () => ({ MailService: class MailService {} }));

import { MailController } from './mail.controller';

describe('MailController RabbitMQ acknowledgement', () => {
  let controller: MailController;
  let send: jest.Mock;
  let publish: jest.Mock;
  let channel: { ack: jest.Mock; nack: jest.Mock };
  let logger: { setContext: jest.Mock; info: jest.Mock; warn: jest.Mock; error: jest.Mock };
  let context: RmqContext;
  const message = { fields: { deliveryTag: 42 } };
  const job: EmailJob = {
    jobId: 'parent-mail-123',
    correlationId: 'request-456',
    createdAt: '2026-10-25T12:00:00.000Z',
    to: 'controlled-parent@example.test',
    subject: 'Welcome',
    templateId: 1,
    variables: { username: 'private-login', pin: 'private-pin', bodyHtml: '<p>Welcome</p>' },
    meta: { centerId: 12, parentId: 7 },
  };

  beforeEach(() => {
    send = jest.fn();
    publish = jest.fn().mockResolvedValue(undefined);
    channel = { ack: jest.fn(), nack: jest.fn() };
    logger = { setContext: jest.fn(), info: jest.fn(), warn: jest.fn(), error: jest.fn() };
    context = {
      getChannelRef: () => channel,
      getMessage: () => message,
      getPattern: () => PATTERNS.EMAIL_SEND,
    } as unknown as RmqContext;
    controller = new MailController(
      { send } as unknown as MailService,
      { publish } as unknown as MailResultPublisher,
      logger as unknown as PinoLogger,
    );
  });

  it('publishes a successful delivery result before acknowledging the original message once', async () => {
    const result = { jobId: job.jobId, success: true, providerId: 'resend-789', meta: job.meta };
    send.mockResolvedValue({ ...result, templateId: 1 });

    await controller.handleEmailSend(job, context);

    expect(send).toHaveBeenCalledTimes(1);

    expect(send).toHaveBeenCalledWith(job);
    expect(publish).toHaveBeenCalledTimes(1);
    expect(publish).toHaveBeenCalledWith(result);
    expect(channel.ack).toHaveBeenCalledTimes(1);
    expect(channel.ack).toHaveBeenCalledWith(message);
    expect(channel.nack).not.toHaveBeenCalled();
    expect(publish.mock.invocationCallOrder[0]).toBeLessThan(channel.ack.mock.invocationCallOrder[0]);
    expect(logger.info).toHaveBeenCalledWith(expect.objectContaining({
      jobId: job.jobId, correlationId: job.correlationId, providerId: 'resend-789', templateId: 1,
    }), 'Email sent.');
    const logs = JSON.stringify([logger.info.mock.calls, logger.warn.mock.calls, logger.error.mock.calls]);
    expect(logs).not.toContain(job.to);
    expect(logs).not.toContain('private-login');
    expect(logs).not.toContain('private-pin');
  });

  it('publishes an expected provider rejection and acknowledges rather than redelivering it', async () => {
    const result = { jobId: job.jobId, success: false, error: 'Sender is not verified', meta: job.meta };
    send.mockResolvedValue({ ...result, templateId: 1 });

    await controller.handleEmailSend(job, context);

    expect(publish).toHaveBeenCalledTimes(1);

    expect(publish).toHaveBeenCalledWith(result);
    expect(channel.ack).toHaveBeenCalledTimes(1);
    expect(channel.ack).toHaveBeenCalledWith(message);
    expect(channel.nack).not.toHaveBeenCalled();
    expect(logger.warn).toHaveBeenCalledWith(expect.objectContaining({ error: result.error }), 'Email rejected by the provider.');
    expect(logger.error).not.toHaveBeenCalled();
  });

  it('dead-letters thrown delivery failures without publishing or acknowledging', async () => {
    const failure = new Error('Resend network unavailable');
    send.mockRejectedValue(failure);

    await expect(controller.handleEmailSend(job, context)).resolves.toBeUndefined();

    expect(send).toHaveBeenCalledTimes(1);
    expect(publish).not.toHaveBeenCalled();
    expect(channel.ack).not.toHaveBeenCalled();
    expect(channel.nack).toHaveBeenCalledTimes(1);
    expect(channel.nack).toHaveBeenCalledWith(message, false, false);
    expect(logger.error).toHaveBeenCalledWith({ err: failure, jobId: job.jobId, pattern: PATTERNS.EMAIL_SEND }, 'Job failed - dead-lettered.');
  });

  it.each([true, false])('dead-letters failed result publication after delivery success=%s', async (success) => {
    const failure = new Error('Result publisher unavailable');
    send.mockResolvedValue({ jobId: job.jobId, success, templateId: 1 });
    publish.mockRejectedValue(failure);

    await expect(controller.handleEmailSend(job, context)).resolves.toBeUndefined();

    expect(send).toHaveBeenCalledTimes(1);
    expect(publish).toHaveBeenCalledTimes(1);
    expect(channel.ack).not.toHaveBeenCalled();
    expect(channel.nack).toHaveBeenCalledTimes(1);
    expect(channel.nack).toHaveBeenCalledWith(message, false, false);
    expect(logger.error).toHaveBeenCalledWith(expect.objectContaining({ err: failure, jobId: job.jobId }), 'Job failed - dead-lettered.');
  });
});
