import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import type { TokenMessage } from 'firebase-admin/messaging';
import { DeviceType, PushJob, PushNotificationType, PushRecipient } from '../../config/rabbitmq/contracts/push-job';
import { FcmService } from './fcm.service';
import { ApnService } from './apn.service';
import { PushDispatchResult, mergeOutcomes } from './dto/dispatch-outcome';

/** The `type` data value the provider app expects - legacy sends the literal '1' for every provider push. */
const PROVIDER_PUSH_TYPE = '1';

/**
 * Turns a resolved PushJob into FCM/APN calls with the exact payloads the installed apps
 * expect (ported from Nursery's former LegacyPushNotificationService dispatch + the three
 * Notification-Server-Web endpoints it called):
 *
 * | audience | Android                              | iOS                                   |
 * |----------|--------------------------------------|---------------------------------------|
 * | parent   | FCM multicast per parent (`ParentId`) | APN direct, topic = job.apnBundleId   |
 * | provider | FCM per device, data-only (`UserId`)  | FCM per device + notification block   |
 */
@Injectable()
export class PushService {
  constructor(
    private readonly fcmService: FcmService,
    private readonly apnService: ApnService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(PushService.name);
  }

  async dispatch(job: PushJob): Promise<PushDispatchResult> {
    this.assertValidJob(job);

    const recipients = job.recipients.filter((r) => r?.deviceToken);
    if (recipients.length === 0) {
      return { warnings: ['Job has no recipients with a device token.'] };
    }

    return job.audience === 'provider'
      ? this.dispatchToProviders(job, recipients)
      : this.dispatchToParents(job, recipients);
  }

  private async dispatchToParents(job: PushJob, recipients: PushRecipient[]): Promise<PushDispatchResult> {
    const warnings: string[] = [];
    const type = PushNotificationType[job.notificationType] ?? String(job.notificationType);

    const android = recipients.filter((r) => r.deviceType === DeviceType.Android);
    const ios = recipients.filter((r) => r.deviceType === DeviceType.Ios);

    if (ios.length > 0 && !job.apnBundleId) {
      warnings.push('iOS recipients exist but the job has no apnBundleId - iOS push skipped.');
    }

    // One multicast per parent, not one for the whole batch: `ParentId` goes into the data
    // payload, so mixing parents' tokens in one call would give them all the same id.
    const byParent = groupTokensByUser(android);

    const [fcmOutcomes, apn] = await Promise.all([
      Promise.all(
        [...byParent.entries()].map(([parentId, tokens]) =>
          this.fcmService.sendMulticast(tokens, {
            message: job.message,
            ParentId: parentId,
            UTCTime: new Date().toISOString(),
            type,
          }),
        ),
      ),
      ios.length > 0 && job.apnBundleId
        ? this.apnService.send(
            job.apnBundleId,
            ios.map((r) => r.deviceToken),
            job.message,
            (token) => ({ ParentId: '', type, UTCTime: new Date().toLocaleDateString(), Token: token }),
          )
        : Promise.resolve(undefined),
    ]);

    return {
      fcm: fcmOutcomes.length ? mergeOutcomes(fcmOutcomes) : undefined,
      apn,
      warnings,
    };
  }

  /**
   * Provider app: both platforms through Firebase (its iOS build registers FCM tokens). It
   * only displays a data message whose `UserId` matches the logged-in provider and whose
   * `type` is '1'; iOS additionally needs a notification block to be shown.
   */
  private async dispatchToProviders(job: PushJob, recipients: PushRecipient[]): Promise<PushDispatchResult> {
    const messages: TokenMessage[] = recipients.map((r) => {
      const data = {
        message: job.message,
        Token: r.deviceToken,
        UserId: String(r.userId ?? ''),
        type: PROVIDER_PUSH_TYPE,
        UTCTime: new Date().toISOString(),
      };

      return r.deviceType === DeviceType.Ios
        ? {
            token: r.deviceToken,
            notification: { title: 'Notification', body: job.message },
            data,
            apns: { payload: { aps: { contentAvailable: true, sound: 'default' } } },
          }
        : { token: r.deviceToken, data };
    });

    return { fcm: await this.fcmService.sendEach(messages), warnings: [] };
  }

  /** A malformed job is a producer bug - throw so it lands in the DLQ for inspection. */
  private assertValidJob(job: PushJob): void {
    if (!job || typeof job.message !== 'string' || !Array.isArray(job.recipients)) {
      throw new Error('Invalid push job: message (string) and recipients (array) are required.');
    }
    if (job.audience !== 'parent' && job.audience !== 'provider') {
      throw new Error(`Invalid push job: unknown audience '${job.audience}'.`);
    }
  }
}

function groupTokensByUser(recipients: PushRecipient[]): Map<string, string[]> {
  const groups = new Map<string, string[]>();
  for (const r of recipients) {
    const userId = String(r.userId ?? '');
    const tokens = groups.get(userId);
    if (tokens) tokens.push(r.deviceToken);
    else groups.set(userId, [r.deviceToken]);
  }
  return groups;
}
