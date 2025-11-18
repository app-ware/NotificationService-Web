import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsNumber,
} from 'class-validator';
import { DeviceType } from '../enums';

export class CenterUserDeviceDto {

    @IsOptional()
    id: number;
    @IsOptional()
    deviceType: DeviceType | null;
    @IsNotEmpty()
    @IsString()
    deviceToken: string;
    @IsOptional()
    registrationDate: Date = new Date ();
    @IsString()
    @IsOptional()
    deviceModel: string | null;
    @IsOptional()
    deviceOsVersion: number | null;
    @IsNotEmpty()
    @IsNumber()
    userId: number;
}

