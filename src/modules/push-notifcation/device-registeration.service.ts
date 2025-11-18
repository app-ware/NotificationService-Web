import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CenterUserDeviceRegistration } from 'src/database/icare/entities/entities/CenterUserDeviceRegistration';
import { SecUsers } from 'src/database/icare/entities/entities/SecUsers';
import { Repository } from 'typeorm';
import { CenterUserDeviceDto, ParentDeviceDto,ProviderDeviceDto } from './dto/index';
import { DeviceRegistration } from 'src/database/icare/entities/entities/DeviceRegistration';
import { Parent } from 'src/database/icare/entities/entities/Parent';
import { ProviderDeviceRegistration } from 'src/database/icare/entities/entities/ProviderDeviceRegistration';
import { Provider } from 'src/database/icare/entities/entities/Provider';

@Injectable()
export class DeviceRegisterationService {
    constructor(
              @InjectRepository(CenterUserDeviceRegistration, 'icare')
              private centerUserDeviceRegistrationRepo: Repository<CenterUserDeviceRegistration>,
              @InjectRepository(SecUsers, 'icare')
              private secUsersRepo: Repository<SecUsers>,
              @InjectRepository(DeviceRegistration, 'icare')
              private deviceRegistrationRepo: Repository<DeviceRegistration>,
              @InjectRepository(Parent, 'icare')
              private parentRepo: Repository<Parent>,
              @InjectRepository(ProviderDeviceRegistration, 'icare')
              private providerDeviceRegistrationRepo: Repository<ProviderDeviceRegistration>,
              @InjectRepository(Provider, 'icare')
              private providerRepo: Repository<Provider>,
  ) {}
//#region Center User Device
async registerCenterUserDevice(centerUserDeviceDto: CenterUserDeviceDto): Promise<CenterUserDeviceRegistration> {
    const deviceExists = await this.centerUserDeviceRegistrationRepo.findOne({where: {deviceToken: centerUserDeviceDto.deviceToken}});
    if (deviceExists) throw new BadRequestException('Device already registered');
    const user = await this.secUsersRepo.findOne({where: {id: centerUserDeviceDto.userId}});
    if (!user) throw new BadRequestException('User not found');
    const centerUserDevice = new CenterUserDeviceRegistration();
    centerUserDevice.user = user;
    centerUserDevice.deviceModel = centerUserDeviceDto.deviceModel;
    centerUserDevice.deviceOsVersion = centerUserDeviceDto.deviceOsVersion;
    centerUserDevice.deviceToken = centerUserDeviceDto.deviceToken;
    centerUserDevice.deviceType = centerUserDeviceDto.deviceType;
    return this.centerUserDeviceRegistrationRepo.save(centerUserDevice);
}
async unregisterCenterUserDevice(deviceToken: string): Promise<void> {
    const device = await this.centerUserDeviceRegistrationRepo.findOne({where: {deviceToken}});
    if (!device) throw new BadRequestException('Device not found');
    await this.centerUserDeviceRegistrationRepo.remove(device);
}
async unregisterAllDevicesForUser(userId: number): Promise<void> {
    const user = await this.secUsersRepo.findOne({where: {id: userId}});
    if (!user) throw new BadRequestException('User not found');
    const devices = await this.centerUserDeviceRegistrationRepo.find({where: {user: {id: userId}}});
    if (devices.length === 0) throw new BadRequestException('No devices found for user');
    await this.centerUserDeviceRegistrationRepo.remove(devices);
}
//#endregion Center User Device
//#region  Parent Device
 async registerParentDevice(parentDeviceDto: ParentDeviceDto): Promise<DeviceRegistration> {
    const deviceExists = await this.deviceRegistrationRepo.findOne({where: {deviceRegId: parentDeviceDto.deviceRegId}});
    if (deviceExists) throw new BadRequestException('Device already registered');
    const parentDevice = new DeviceRegistration();
    parentDevice.deviceModel = parentDeviceDto.deviceModel;
    parentDevice.osVersion = parentDeviceDto.OSVersion;
    parentDevice.deviceRegId = parentDeviceDto.deviceRegId;
    parentDevice.deviceType = parentDeviceDto.deviceType;
    parentDevice.isActive = parentDeviceDto.isActive;
    parentDevice.isPrimary = parentDeviceDto.isPrimary;
    parentDevice.timeZone = parentDeviceDto.timezone;
    parentDevice.isPrimary  = parentDeviceDto.isPrimary;
    parentDevice.appBundle = parentDeviceDto.appBundle;
    parentDevice.deviceUuid = parentDeviceDto.deviceUUID;
    parentDevice.appVersion = parentDeviceDto.appVersion;
    parentDevice.locale = parentDeviceDto.locale;
    parentDevice.registrationDate = parentDeviceDto.registrationDate;
    const parent = await this.parentRepo.findOne({where: {id: parentDeviceDto.parentId}});
    if (!parent) throw new BadRequestException('Parent not found');
    parentDevice.parentId = parent.id.toString();
    // parentDevice.token = parentDeviceDto.token;
    return this.deviceRegistrationRepo.save(parentDevice);
}
async unregisterParentDevice(deviceRegId: string): Promise<void> {
    const device = await this.deviceRegistrationRepo.findOne({where: {deviceRegId}});
    if (!device) throw new BadRequestException('Device not found');
    await this.deviceRegistrationRepo.remove(device);
}
async unregisterAllDevicesForParent(parentId: number): Promise<void> {
    const parent = await this.parentRepo.findOne({where: {id: parentId}});
    if (!parent) throw new BadRequestException('Parent not found');
    const devices = await this.deviceRegistrationRepo.find({where: {parentId: parent.id.toString()}});
    if (devices.length === 0) throw new BadRequestException('No devices found for parent');
    await this.deviceRegistrationRepo.remove(devices);
}
//#endregion Parent Device

//#region Teacher Device
async registerProviderDevice(providerDeviceDto: ProviderDeviceDto): Promise<ProviderDeviceRegistration> {
    const deviceExists = await this.providerDeviceRegistrationRepo.findOne({where: {deviceToken: providerDeviceDto.deviceToken}});
    if (deviceExists) throw new BadRequestException('Device already registered');
    const providerDevice = new ProviderDeviceRegistration();
    providerDevice.deviceModel = providerDeviceDto.deviceModel;
    providerDevice.osVersion = providerDeviceDto.OSVersion;
    providerDevice.deviceToken = providerDeviceDto.deviceToken;
    providerDevice.deviceType = providerDeviceDto.deviceType;
    providerDevice.timeZone = providerDeviceDto.timezone;
    providerDevice.appBundle = providerDeviceDto.appBundle;
    providerDevice.deviceUuid = providerDeviceDto.deviceUUID;
    providerDevice.appVersion = providerDeviceDto.appVersion;
    providerDevice.locale = providerDeviceDto.locale;
    providerDevice.registrationDate = providerDeviceDto.registrationDate;
    const provider = await this.providerRepo.findOne({where: {providerId: providerDeviceDto.providerId}});
    if (!provider) throw new BadRequestException('Provider not found');
    providerDevice.provider = provider;
    return this.providerDeviceRegistrationRepo.save(providerDevice);
}
async unregisterProviderDevice(deviceToken: string): Promise<void> {
    const device = await this.providerDeviceRegistrationRepo.findOne({where: {deviceToken}});
    if (!device) throw new BadRequestException('Device not found');
    await this.providerDeviceRegistrationRepo.remove(device);
}
async unregisterAllDevicesForProvider(providerId: number): Promise<void> {
    const provider = await this.providerRepo.findOne({where: {providerId}});
    if (!provider) throw new BadRequestException('Provider not found');
    const devices = await this.providerDeviceRegistrationRepo.find({where: {provider: {providerId}}});
    if (devices.length === 0) throw new BadRequestException('No devices found for provider');
    await this.providerDeviceRegistrationRepo.remove(devices);
}
//#endregion Teacher Device
}
