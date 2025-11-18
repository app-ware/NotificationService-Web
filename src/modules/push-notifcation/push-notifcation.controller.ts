import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { PushNotifcationService } from './push-notifcation.service';
import { CenterUserDeviceDto, getTokenDto } from './dto';
import { DeviceRegisterationService } from './device-registeration.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { NotificationDto } from './dto/notification-data';

@Controller('push-notifcation')
export class PushNotifcationController {
  constructor(private readonly pushNotifcationService: PushNotifcationService,
    private readonly deviceRegistrationService : DeviceRegisterationService  ) {}
  @Post('register/user-device')
  @HttpCode(HttpStatus.OK)
  async registerUserDevice(@Body() body: CenterUserDeviceDto) {
    await this.deviceRegistrationService.registerCenterUserDevice(body);
  }
  @Post('unregister/user-device')
  @HttpCode(HttpStatus.OK)
  async unregisterUserDevice(@Body() body: { deviceToken: string }) {
    await this.deviceRegistrationService.unregisterCenterUserDevice(body.deviceToken);
  }
  @Post('register/parent-device')
  @HttpCode(HttpStatus.OK)
  async registerParentDevice(@Body() body: any) {
    await this.deviceRegistrationService.registerParentDevice(body);
  }
  @Post('unregister/parent-device')
  @HttpCode(HttpStatus.OK)
  async unregisterParentDevice(@Body() body: { deviceToken: string }) {
    await this.deviceRegistrationService.unregisterParentDevice(body.deviceToken);
  }
  @Post('register/provider-device')
  @HttpCode(HttpStatus.OK)
  async registerProviderDevice(@Body() body: any) {
    await this.deviceRegistrationService.registerProviderDevice(body);
  }
  @Post('unregister/provider-device')
  @HttpCode(HttpStatus.OK)
  async unregisterProviderDevice(@Body() body: { deviceToken: string }) {
    await this.deviceRegistrationService.unregisterProviderDevice(body.deviceToken);
  }
  // @Get('tokens')
  // @HttpCode(HttpStatus.OK)
  // async getDeviceToken(@Query() dto :getTokenDto) {
  //  return await this.pushNotifcationService.getTokenstest(dto);
  // }

  @EventPattern('notificationData')
  handleOrderPlaced(@Payload() data : NotificationDto ,@Ctx() ctx: RmqContext) {
    console.log('data recived ')
    return this.pushNotifcationService.sendNotification(data , ctx);
  }
  }



