import { RmqContext } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import type { Channel, ConsumeMessage } from 'amqplib';

/**
 * Runs one queued job with manual ack: ack once `work` resolves, otherwise nack WITHOUT
 * requeue so the message is dead-lettered to `<queue>.dlq` (never an infinite redelivery
 * loop). Expected per-recipient failures (bad token, rejected address) are part of a
 * successful job's result, not a throw - only unexpected failures reach the DLQ.
 * Settlement errors are separate: a closed channel cannot ack or nack its delivery,
 * and RabbitMQ can redeliver it after reconnecting.
 */
export async function runRmqJob(
  ctx: RmqContext,
  logger: PinoLogger,
  jobId: string | undefined,
  work: () => Promise<void>,
): Promise<void> {
  const channel = ctx.getChannelRef() as Channel;
  const message = ctx.getMessage() as ConsumeMessage;

  try {
    await work();
  } catch (error: unknown) {
    try {
      channel.nack(message, false, false);
    } catch (nackError: unknown) {
      logger.error(
        { err: error, nackError, jobId, pattern: ctx.getPattern() },
        'Job failed, but rejection failed. RabbitMQ may redeliver the job.',
      );
      return;
    }
    logger.error(
      { err: error, jobId, pattern: ctx.getPattern() },
      'Job failed - dead-lettered.',
    );
    return;
  }

  try {
    channel.ack(message);
  } catch (error: unknown) {
    logger.error(
      { err: error, jobId, pattern: ctx.getPattern() },
      'Job completed, but acknowledgement failed. RabbitMQ may redeliver the job.',
    );
  }
}
