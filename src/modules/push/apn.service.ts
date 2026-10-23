import { readFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import * as apn from '@parse/node-apn';
import { DispatchOutcome } from './dto/dispatch-outcome';

interface ApnKey {
  /** .p8 file name, relative to the config file's folder. */
  keyFile: string;
  keyId: string;
  teamId: string;
}

/**
 * APN_CONFIG_PATH file shape (see keys/apn.example.json). Replaces the hardcoded
 * apnOptions* objects + bundle switch in Notification-Server-Web/server.js.
 */
interface ApnConfigFile {
  production: boolean;
  /** Used for any bundle not listed below (legacy: the iCare key). */
  default: ApnKey;
  bundles: Record<string, ApnKey>;
}

/**
 * Direct APN for the PARENT iOS app (its builds register raw APN tokens, not FCM tokens).
 * The provider iOS app never comes through here - it registers FCM tokens.
 */
@Injectable()
export class ApnService implements OnModuleInit {
  private config: ApnConfigFile;
  private configDir: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(ApnService.name);
  }

  onModuleInit() {
    const path = resolve(this.configService.getOrThrow<string>('APN_CONFIG_PATH'));
    this.config = JSON.parse(readFileSync(path, 'utf8'));
    this.configDir = dirname(path);
    this.logger.info(
      { production: this.config.production, bundles: Object.keys(this.config.bundles) },
      'APN config loaded.',
    );
  }

  /**
   * One Notification per token - `Token` in the payload differs per recipient, and node-apn
   * compiles a Notification's payload on first send, so a shared object would carry the
   * first recipient's token to everyone (the bug fixed in legacy as 7745eee).
   *
   * A provider (HTTP/2 connection) is opened per job and shut down after it - the same
   * lifecycle legacy settled on after its cached-provider bug (3dabf97).
   */
  async send(
    bundleId: string,
    tokens: string[],
    alert: string,
    buildPayload: (token: string) => Record<string, unknown>,
  ): Promise<DispatchOutcome> {
    const provider = new apn.Provider(this.providerOptions(bundleId));

    try {
      const results = await Promise.all(
        tokens.map(async (token) => {
          const notification = new apn.Notification();
          notification.badge = 0;
          notification.sound = 'ping.aiff';
          notification.alert = alert;
          notification.topic = bundleId;
          notification.payload = buildPayload(token);

          const result = await provider.send(notification, token);
          const failure = result.failed[0];
          return failure
            ? { deviceToken: token, reason: failure.response?.reason ?? failure.error?.message ?? 'unknown' }
            : null;
        }),
      );

      const failures = results.filter((f): f is { deviceToken: string; reason: string } => f !== null);
      return { successCount: tokens.length - failures.length, failures };
    } finally {
      provider.shutdown();
    }
  }

  private providerOptions(bundleId: string): apn.ProviderOptions {
    const key = this.config.bundles[bundleId] ?? this.config.default;
    return {
      token: {
        key: resolve(this.configDir, key.keyFile),
        keyId: key.keyId,
        teamId: key.teamId,
      },
      production: this.config.production,
    };
  }
}
