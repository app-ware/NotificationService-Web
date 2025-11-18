import { Module } from '@nestjs/common';
import { PushService } from './push/push.service';
import * as admin from 'firebase-admin';

@Module({
      providers: [{
      provide: 'FIREBASE_ADMIN',
      useFactory: () => {
        return admin.initializeApp({
          credential: admin.credential.cert({
            projectId: process.env.FIREBASE_PROJECT_ID,
            clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
            privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
          }),
        });
      },
    }, PushService,
    ],
    exports: ['FIREBASE_ADMIN',PushService],
})
export class FirebaseModule {}
