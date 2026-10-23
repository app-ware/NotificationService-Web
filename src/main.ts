import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { connectRabbitConsumers } from './config/rabbitmq/rabbitmq.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(Logger));
  app.enableShutdownHooks();

  await connectRabbitConsumers(app);
  await app.startAllMicroservices();
  await app.listen(Number(process.env.PORT) || 4448);
}
void bootstrap();
