import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { DeviceType } from '../enums';
export class ProviderDeviceDto {
@IsOptional()
    deviceId: number;

    deviceType: DeviceType ;
    @IsString()
    @IsNotEmpty()
    deviceToken: string;
    @IsOptional()
    registrationDate: Date = new Date();

    @IsNotEmpty()
    @IsNumber()
    providerId: number;
    @IsString()
    @IsOptional()
    timezone: string | null = 'UTC';
    @IsString()
    @IsOptional()
    deviceModel: string | null;
    @IsString()
    @IsOptional()
    _constructor: string | null;
    @IsString()
    @IsOptional()    
    OSVersion: string | null;
    @IsString()
    @IsOptional()    
    manufacturer: string | null;
    @IsString()
    appBundle: string | null;
    @IsString()
    @IsOptional()     
    deviceUUID: string;
    @IsString()
    @IsOptional() 
    appVersion: string;
    @IsString()
    @IsOptional()
    locale: string | null;
    @IsOptional()
    lastUpdate: Date | null;
}