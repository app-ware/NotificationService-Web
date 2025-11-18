export class NotificationDto{
centerId:number;    
notificationId :number;
notifictionType : NotificationType;
title: string;
body: string;
data?: { [key: string]: string }
}

export enum NotificationType {
    Event = 1,
    Notification = 2,
    Daily_Reports = 3,
    Photos = 4,
    Messages = 5,
    Evaluation_Reports = 6,
    Parent_Arrival = 7,
    Teacher_Notification = 20
}