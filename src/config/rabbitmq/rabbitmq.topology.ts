import { connect } from 'amqplib';
import { DEAD_LETTER_EXCHANGE, QUEUES } from './rabbitmq.constants';

/**
 * Asserts the dead-letter exchange and one DLQ per queue. Nest's RMQ transport only asserts
 * the main queues (with their x-dead-letter-* arguments) - without this, a nacked message
 * would be routed to an exchange that doesn't exist and silently dropped.
 *
 * Idempotent: asserting what already exists with the same options is a no-op.
 */
export async function assertDeadLetterTopology(url: string): Promise<void> {
  const connection = await connect(url);
  try {
    const channel = await connection.createChannel();
    await channel.assertExchange(DEAD_LETTER_EXCHANGE, 'direct', { durable: true });

    for (const queue of Object.values(QUEUES)) {
      await channel.assertQueue(queue.deadLetterQueue, { durable: true });
      await channel.bindQueue(queue.deadLetterQueue, DEAD_LETTER_EXCHANGE, queue.deadLetterQueue);
    }

    await channel.close();
  } finally {
    await connection.close();
  }
}
