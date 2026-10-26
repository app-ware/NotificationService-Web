import { BadRequestException, Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import type { EmailDesign } from '../../config/rabbitmq/contracts/email-job';
import { InternalApiKeyGuard } from '../../common/internal-api-key.guard';
import { MailTemplateService } from './mail-template.service';
import type { ResolvedDesign } from './mail-design';

/** POST /mail/preview body - the same `design` + `variables` an EmailJob carries. */
interface MailPreviewRequest {
  design?: EmailDesign | null;
  variables: Record<string, string | null | undefined>;
}

/**
 * Renders an email exactly as a real send would (same layouts, same escaping) and returns the
 * HTML instead of sending it - for the Settings screen's preview, proxied by Nursery, which
 * fills in the real center data and a sample parent. Nothing is queued or sent.
 */
@Controller('mail')
@UseGuards(InternalApiKeyGuard)
export class MailPreviewController {
  constructor(private readonly templateService: MailTemplateService) {}

  @Post('preview')
  @HttpCode(HttpStatus.OK)
  preview(@Body() body: MailPreviewRequest): { html: string; design: ResolvedDesign } {
    if (!body || typeof body.variables !== 'object' || body.variables === null || Array.isArray(body.variables)) {
      throw new BadRequestException('variables (object) is required.');
    }
    return this.templateService.render(body.design, body.variables);
  }
}
