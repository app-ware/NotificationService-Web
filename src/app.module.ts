import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { loggerConfig } from './config/logger/logger.config';
import { HealthController } from './health.controller';
import { PushModule } from './modules/push/push.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule.forRoot(loggerConfig),
    PushModule,
    MailModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
