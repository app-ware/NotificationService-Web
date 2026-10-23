import { RmqContext } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';

/**
 * Runs one queued job with manual ack: ack once `work` resolves, otherwise nack WITHOUT
 * requeue so the message is dead-lettered to `<queue>.dlq` (never an infinite redelivery
 * loop). Expected per-recipient failures (bad token, rejected address) are part of a
 * successful job's result, not a throw - only unexpected failures reach the DLQ.
 */
export async function runRmqJob(
  ctx: RmqContext,
  logger: PinoLogger,
  jobId: string | undefined,
  work: () => Promise<void>,
): Promise<void> {
  const channel = ctx.getChannelRef();
  const message = ctx.getMessage();

  try {
    await work();
    channel.ack(message);
  } catch (error) {
    logger.error({ err: error, jobId, pattern: ctx.getPattern() }, 'Job failed - dead-lettered.');
    channel.nack(message, false, false);
  }
}
