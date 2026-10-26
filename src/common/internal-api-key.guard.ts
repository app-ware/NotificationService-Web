import { timingSafeEqual } from 'crypto';
import { CanActivate, ExecutionContext, Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

export const INTERNAL_API_KEY_HEADER = 'x-internal-api-key';

/**
 * Guards the internal HTTP routes (skill 14 §2: one key per downstream, fail closed). Callers -
 * only NurseryServices-Web today - send NOTIFICATION_SERVICE_API_KEY as X-Internal-API-Key.
 * The service has no public port; this key is the second line of defense inside the network.
 */
@Injectable()
export class InternalApiKeyGuard implements CanActivate {
  private readonly expected: Buffer | null;

  constructor(configService: ConfigService) {
    const key = configService.get<string>('NOTIFICATION_SERVICE_API_KEY');
    this.expected = key ? Buffer.from(key) : null;
  }

  canActivate(context: ExecutionContext): boolean {
    if (!this.expected) {
      // Fail closed: no configured key means no internal route is reachable, never "open".
      throw new ServiceUnavailableException('Internal API is not configured.');
    }

    const provided = context.switchToHttp().getRequest<Request>().headers[INTERNAL_API_KEY_HEADER];
    const candidate = Buffer.from(typeof provided === 'string' ? provided : '');
    if (candidate.length !== this.expected.length || !timingSafeEqual(candidate, this.expected)) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
