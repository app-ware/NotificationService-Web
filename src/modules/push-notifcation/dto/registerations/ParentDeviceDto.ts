import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
    IsBoolean,
} from 'class-validator';
import { DeviceType } from '../enums';

export class ParentDeviceDto {
    @IsOptional()
    deviceId: number;
    @IsNotEmpty()
    @IsString()
    deviceRegId: string;
    deviceType: DeviceType | null;
    @IsString()
    @IsOptional()
    token: string | null;
    @IsOptional()
    registrationDate: Date = new Date();
    @IsBoolean()
    @IsOptional()
    isActive: boolean | null ;
    @IsBoolean()
    @IsOptional()    
    isPrimary: boolean | null;
    @IsNotEmpty()
    @IsNumber()
    parentId: number;
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