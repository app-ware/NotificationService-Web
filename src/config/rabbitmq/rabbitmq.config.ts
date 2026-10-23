import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { QUEUES, QueueKey, queueAssertOptions } from './rabbitmq.constants';
import { assertDeadLetterTopology } from './rabbitmq.topology';

/**
 * Consumer options for one queue: manual ack (noAck: false) so a message is only removed
 * once its handler acked it, and a per-queue prefetch so one consumer never holds more
 * unacked messages than it can work on.
 */
export function rmqServerOptions(key: QueueKey, url: string): MicroserviceOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [url],
      queue: QUEUES[key].name,
      queueOptions: queueAssertOptions(key),
      noAck: false,
      prefetchCount: QUEUES[key].prefetchCount,
    },
  };
}

/** Asserts the dead-letter topology, then attaches one RMQ consumer per queue. */
export async function connectRabbitConsumers(app: INestApplication): Promise<void> {
  const url = app.get(ConfigService).getOrThrow<string>('RABBITMQ_URL');

  await assertDeadLetterTopology(url);

  for (const key of Object.keys(QUEUES) as QueueKey[]) {
    app.connectMicroservice<MicroserviceOptions>(rmqServerOptions(key, url), { inheritAppConfig: true });
  }
}
