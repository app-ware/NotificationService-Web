import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { App, cert, initializeApp, ServiceAccount } from 'firebase-admin/app';
import { getMessaging, Messaging, TokenMessage } from 'firebase-admin/messaging';
import { readBase64JsonEnv } from '../../common/base64-env.util';
import { DispatchOutcome, mergeOutcomes } from './dto/dispatch-outcome';

/** FCM's limit for one sendEachForMulticast / sendEach call. */
const FCM_BATCH_LIMIT = 500;

/**
 * Firebase Cloud Messaging through the LEGACY Firebase project - the one already-installed
 * app builds registered their tokens with (same service account as Notification-Server-Web).
 */
@Injectable()
export class FcmService implements OnModuleInit {
  private messaging: Messaging;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(FcmService.name);
  }

  onModuleInit() {
    // The legacy project's serviceAccountKey.json, base64-encoded in env.
    const serviceAccount = readBase64JsonEnv<ServiceAccount & { project_id?: string }>(
      this.configService,
      'FIREBASE_SERVICE_ACCOUNT_B64',
    );
    const app: App = initializeApp({ credential: cert(serviceAccount) }, 'legacy-push');
    this.messaging = getMessaging(app);
    this.logger.info({ projectId: serviceAccount.project_id }, 'Firebase initialized.');
  }

  /** Same data payload to many tokens (parent app, Android). */
  async sendMulticast(tokens: string[], data: Record<string, string>): Promise<DispatchOutcome> {
    const outcomes: DispatchOutcome[] = [];

    for (const batch of chunk(tokens, FCM_BATCH_LIMIT)) {
      const response = await this.messaging.sendEachForMulticast({ tokens: batch, data });
      outcomes.push({
        successCount: response.successCount,
        failures: response.responses.flatMap((r, i) =>
          r.success ? [] : [{ deviceToken: batch[i], reason: r.error?.code ?? 'unknown' }],
        ),
      });
    }
    return mergeOutcomes(outcomes);
  }

  /** One distinct message per token (provider app - `Token`/`UserId` differ per recipient). */
  async sendEach(messages: TokenMessage[]): Promise<DispatchOutcome> {
    const outcomes: DispatchOutcome[] = [];

    for (const batch of chunk(messages, FCM_BATCH_LIMIT)) {
      const response = await this.messaging.sendEach(batch);
      outcomes.push({
        successCount: response.successCount,
        failures: response.responses.flatMap((r, i) =>
          r.success ? [] : [{ deviceToken: batch[i].token, reason: r.error?.code ?? 'unknown' }],
        ),
      });
    }
    return mergeOutcomes(outcomes);
  }
}

function chunk<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) chunks.push(items.slice(i, i + size));
  return chunks;
}
