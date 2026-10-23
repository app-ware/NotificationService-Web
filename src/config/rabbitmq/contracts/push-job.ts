/**
 * `push.send` payload - CONTRACT, keep identical in NurseryServices-Web.
 *
 * Nursery resolves everything (recipients, text, can_notify gate, APN bundle) from its DB
 * and publishes a ready-to-send job. This service only turns it into FCM/APN calls.
 */

/**
 * Mirrors Nursery's PushNotificationType (iCareNotification_requestNotificationData's
 * @notificationType values). The parent app receives the enum NAME as its `type` data field.
 */
export enum PushNotificationType {
  Event = 1,
  Notification = 2,
  DailyReport = 3,
  Photo = 4,
  Message = 5,
  EvaluationReport = 6,
  GateArrivalRequest = 7,
  Provider = 20,
}

/** Device_Registration.device_type / Provider_Device_Registration.device_type. */
export enum DeviceType {
  Ios = 1,
  Android = 2,
}

export type PushAudience = 'parent' | 'provider';

export interface PushRecipient {
  deviceToken: string;
  /** parent_id for the parent app, provider_id for the provider app (NVARCHAR in the DB). */
  userId: string;
  deviceType: DeviceType;
}

export interface PushJob {
  jobId: string;
  correlationId?: string;
  createdAt: string;
  centerId: number;
  notificationType: PushNotificationType;
  audience: PushAudience;
  message: string;
  /** Parent iOS only - the APN topic. Ignored for the provider app (FCM on both platforms). */
  apnBundleId?: string | null;
  recipients: PushRecipient[];
}
