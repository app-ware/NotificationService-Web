import { Module } from '@nestjs/common';
import { PushNotifcationService } from './push-notifcation.service';
import { PushNotifcationController } from './push-notifcation.controller';
import { DeviceRegisterationService } from './device-registeration.service';
import { Provider } from 'src/database/icare/entities/entities/Provider';
import { ProviderDeviceRegistration } from 'src/database/icare/entities/entities/ProviderDeviceRegistration';
import { Parent } from 'src/database/icare/entities/entities/Parent';
import { DeviceRegistration } from 'src/database/icare/entities/entities/DeviceRegistration';
import { SecUsers } from 'src/database/icare/entities/entities/SecUsers';
import { CenterUserDeviceRegistration } from 'src/database/icare/entities/entities/CenterUserDeviceRegistration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FirebaseModule } from '../firebase/firebase.module';

@Module({
  imports : [TypeOrmModule.forFeature([CenterUserDeviceRegistration, SecUsers,DeviceRegistration,Parent,ProviderDeviceRegistration,Provider], 'icare'),
  FirebaseModule,
],
  controllers: [PushNotifcationController],
  providers: [PushNotifcationService,DeviceRegisterationService],
})
export class PushNotifcationModule {}
