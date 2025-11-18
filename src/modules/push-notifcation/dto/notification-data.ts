import { NotificationType } from "./enums";

export class NotificationDto{
centerId:number;    
notificationId :number;
notifictionType : NotificationType;
title: string;
body: string;
data?: { [key: string]: string }
}
// export enum recieverType {
//     parent = 1,
//     provider = 2,
//     centerUser = 3
// }