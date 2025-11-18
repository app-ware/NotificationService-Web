import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppValidationPipe } from './common/pipes/validation.pipe';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // 2. -----------------------------------------------------------------
  //    HTTP-only configuration (global prefix, validation pipe, etc.)
  // -----------------------------------------------------------------
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(AppValidationPipe);

  const port = Number(process.env.PORT) || 3333;

  // 3. -----------------------------------------------------------------
  //    Connect the **RabbitMQ micro-service** part
  // -----------------------------------------------------------------
  const rmqOptions: MicroserviceOptions = {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://user:pass@localhost:5672'],  
      queue: process.env.NOTIFICATION_QUEUE || 'notification_queue',
      
      queueOptions: {
        durable: true,
        autoDelete: false,
      }, }
  };

  app.connectMicroservice(rmqOptions);

  // 4. -----------------------------------------------------------------
  //    Start **both** listeners
  // -----------------------------------------------------------------
  await app.startAllMicroservices(); // <-- starts RabbitMQ consumer(s)
  await app.listen(port);            // <-- starts HTTP server

}
bootstrap();
