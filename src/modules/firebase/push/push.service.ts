import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
@Injectable()
export class PushService {
constructor(@Inject('FIREBASE_ADMIN') private firebase: admin.app.App) {}

  async pushToDevice(token: string, title: string, body: string , data?: any) {
    const message = {
      token,
      notification: { title, body },
      data: data || {},
    };
    const response = await this.firebase.messaging().send(message);
  } 
}
