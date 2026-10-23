import { Controller, Get } from '@nestjs/common';

/** Liveness for the docker healthcheck - the only HTTP route this service exposes. */
@Controller('health')
export class HealthController {
  @Get()
  check() {
    return { status: 'ok' };
  }
}
