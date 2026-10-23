/**
 * RabbitMQ CONTRACT - keep this file identical in NurseryServices-Web
 * (src/config/rabbitmq/rabbitmq.constants.ts).
 *
 * Producer and consumer both assert each queue on connect; if the assert options differ
 * (durable, x-dead-letter-* arguments, ...) RabbitMQ refuses the second one with
 * PRECONDITION_FAILED. Change a queue here and in Nursery in the same rollout.
 *
 * Queues live on the default exchange (routing key = queue name). Failed messages are
 * nacked without requeue and dead-lettered to `<queue>.dlq` through DEAD_LETTER_EXCHANGE.
 */
export const DEAD_LETTER_EXCHANGE = 'notifications.dlx';

export const QUEUES = {
  push: { name: 'push_queue', deadLetterQueue: 'push_queue.dlq', prefetchCount: 10 },
  email: { name: 'email_queue', deadLetterQueue: 'email_queue.dlq', prefetchCount: 5 },
} as const;

export type QueueKey = keyof typeof QUEUES;

export const PATTERNS = {
  PUSH_SEND: 'push.send',
  EMAIL_SEND: 'email.send',
} as const;

/** The exact assert options both sides must use for a queue. */
export function queueAssertOptions(key: QueueKey) {
  return {
    durable: true,
    arguments: {
      'x-dead-letter-exchange': DEAD_LETTER_EXCHANGE,
      'x-dead-letter-routing-key': QUEUES[key].deadLetterQueue,
    },
  };
}
