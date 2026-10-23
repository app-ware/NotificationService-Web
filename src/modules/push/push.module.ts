import { Module } from '@nestjs/common';
import { PushController } from './push.controller';
import { PushService } from './push.service';
import { FcmService } from './fcm.service';
import { ApnService } from './apn.service';

@Module({
  controllers: [PushController],
  providers: [PushService, FcmService, ApnService],
})
export class PushModule {}
