import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { PATTERNS } from '../../config/rabbitmq/rabbitmq.constants';
import type { PushJob } from '../../contracts/push-job';
import { runRmqJob } from '../../common/rmq-job.util';
import { PushService } from './push.service';

@Controller()
export class PushController {
  constructor(
    private readonly pushService: PushService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(PushController.name);
  }

  @EventPattern(PATTERNS.PUSH_SEND)
  async handlePushSend(@Payload() job: PushJob, @Ctx() ctx: RmqContext): Promise<void> {
    await runRmqJob(ctx, this.logger, job?.jobId, async () => {
      const result = await this.pushService.dispatch(job);

      this.logger.info(
        {
          jobId: job.jobId,
          correlationId: job.correlationId,
          centerId: job.centerId,
          notificationType: job.notificationType,
          audience: job.audience,
          recipients: job.recipients.length,
          fcm: result.fcm && { success: result.fcm.successCount, failed: result.fcm.failures.length },
          apn: result.apn && { success: result.apn.successCount, failed: result.apn.failures.length },
          warnings: result.warnings.length ? result.warnings : undefined,
        },
        'Push job dispatched.',
      );
      if (result.fcm?.failures.length || result.apn?.failures.length) {
        this.logger.debug(
          { jobId: job.jobId, fcmFailures: result.fcm?.failures, apnFailures: result.apn?.failures },
          'Push token failures.',
        );
      }
    });
  }
}
