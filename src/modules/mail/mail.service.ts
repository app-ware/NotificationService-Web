import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { Resend } from 'resend';
import type { EmailJob, EmailResult, MailTemplateKey } from '../../config/rabbitmq/contracts/email-job';
import { MailTemplateService } from './mail-template.service';
import type { ResolvedDesign } from './mail-design';

/** Resend's sandbox sender - works with only an API key, until MAIL_FROM is a verified domain. */
const RESEND_SANDBOX_FROM = 'onboarding@resend.dev';

/**
 * Renders the job's layout and sends it through Resend.
 *
 * Outcome rules (they decide ack vs dead-letter):
 * - Resend answered with an error (invalid address, rejected sender, ...) → a failed
 *   EmailResult, the job is acked. Retrying wouldn't change the answer.
 * - Anything thrown (no API key configured, network failure) → propagates, the job is
 *   dead-lettered and can be replayed once the cause is fixed.
 */
@Injectable()
export class MailService {
  private readonly resend: Resend | null;
  private readonly defaultFrom: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly templateService: MailTemplateService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(MailService.name);
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.defaultFrom = this.configService.get<string>('MAIL_FROM') || RESEND_SANDBOX_FROM;
    this.resend = apiKey ? new Resend(apiKey) : null;

    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY is not configured - email jobs will be dead-lettered until it is set.');
    }
  }

  async send(job: EmailJob): Promise<EmailResult & { design: ResolvedDesign; template: MailTemplateKey }> {
    this.assertValidJob(job);
    if (!this.resend) {
      throw new Error('Email transport is not configured (RESEND_API_KEY missing).');
    }

    // Throws for a malformed job (e.g. a user-invite without an http(s) link) → dead-lettered.
    const { html, design, template } = this.templateService.render(job.design, job.variables ?? {}, job.template);

    const { data, error } = await this.resend.emails.send(
      { from: job.from ?? this.defaultFrom, to: job.to, subject: job.subject, html },
      // Same jobId → Resend sends once, so a redelivered job doesn't email twice.
      { idempotencyKey: job.jobId },
    );

    return error
      ? { jobId: job.jobId, success: false, error: error.message, meta: job.meta, design, template }
      : { jobId: job.jobId, success: true, providerId: data?.id, meta: job.meta, design, template };
  }

  /** A malformed job is a producer bug - throw so it lands in the DLQ for inspection. */
  private assertValidJob(job: EmailJob): void {
    if (!job?.jobId || !job.to || (Array.isArray(job.to) && job.to.length === 0) || !job.subject) {
      throw new Error('Invalid email job: jobId, to and subject are required.');
    }
  }
}
