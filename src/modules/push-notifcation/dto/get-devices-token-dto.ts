import { IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class getTokenDto {
    @Type(() => Number)
    @IsNumber()
    notification_id : number;
    @Type(() => Number)
    @IsNumber()
    notification_type : number;
    @Type(() => Number)
    @IsNumber()
    center_id : number;
}