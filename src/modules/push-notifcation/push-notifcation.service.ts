import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as mssql from 'mssql';
import { ICARE_MSSQL_POOL } from 'src/config/mssql/mssql-client.constants';
import { NotificationDto } from './dto/notification-data';
import { getTokenDto } from './dto';
import { PushService } from '../firebase/push/push.service';
import { RmqContext } from '@nestjs/microservices';


@Injectable()
export class PushNotifcationService {
   constructor(@Inject(ICARE_MSSQL_POOL)
            private readonly icarePool: mssql.ConnectionPool,
            private readonly pushService :  PushService
          ) {}
   
    async sendNotification(data : NotificationDto , ctx: RmqContext){
      try{
        
        const deviceToken = await this.getTokens(data);
      if (!deviceToken || deviceToken == '') throw new BadRequestException('no device found');
      this.pushService.pushToDevice(deviceToken,data.title,data.body,data.data)
      this.noAcknowledge(ctx);
      }
      catch(err){
                      this.noAcknowledge(ctx);

        throw new BadRequestException(err.message)
      }
      
           
    }
    acknowledge(ctx: RmqContext){
      const channel = ctx.getChannelRef();
      const originalMsg = ctx.getMessage();
      channel.ack(originalMsg);
    }   
    noAcknowledge(ctx: RmqContext){
      const channel = ctx.getChannelRef();
      const originalMsg = ctx.getMessage();
      channel.nack(originalMsg);
    }   
    async getTokens(data : NotificationDto){
      const getNotificationTokensRequest = new mssql.Request(this.icarePool);
            getNotificationTokensRequest.input('center_id', mssql.Int, data.centerId);
            getNotificationTokensRequest.input('notification_id', mssql.Int, data.notificationId);
            getNotificationTokensRequest.input('notification_type', mssql.Int, data.notifictionType );
            const result = await getNotificationTokensRequest.execute('Sp_selNotificationTokens');
            console.log(result);
            return result.recordset[0].deviceToken;
    }
     
    // async getTokenstest(dto :getTokenDto){
    //   const getNotificationTokensRequest = new mssql.Request(this.icarePool);
    //         getNotificationTokensRequest.input('center_id', mssql.Int, dto.center_id);
    //         getNotificationTokensRequest.input('notification_id', mssql.Int, dto.notification_id);
    //         getNotificationTokensRequest.input('notification_type', mssql.Int, dto.notification_type );
    //         const result = await getNotificationTokensRequest.execute('Sp_selNotificationTokens');
    //         console.log(result);
    //         return result.recordset[0].deviceToken;
    // }      
            
}
