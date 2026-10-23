import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import Handlebars from 'handlebars';

export const DEFAULT_TEMPLATE_ID = 1;

/** Copied next to the compiled service by the nest-cli `assets` entry. */
const TEMPLATES_DIR = join(__dirname, 'templates');

/**
 * Email layouts, one file per id: templates/<id>.hbs. Adding a layout is adding a file;
 * the id is what Nursery sends as EmailJob.templateId. Where Nursery stores a center's
 * chosen id is still open - until then every job falls back to DEFAULT_TEMPLATE_ID.
 */
@Injectable()
export class MailTemplateService implements OnModuleInit {
  private readonly templates = new Map<number, Handlebars.TemplateDelegate>();

  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(MailTemplateService.name);
  }

  onModuleInit() {
    for (const file of readdirSync(TEMPLATES_DIR)) {
      const match = /^(\d+)\.hbs$/.exec(file);
      if (!match) continue;
      const source = readFileSync(join(TEMPLATES_DIR, file), 'utf8');
      this.templates.set(Number(match[1]), Handlebars.compile(source, { strict: false }));
    }

    if (!this.templates.has(DEFAULT_TEMPLATE_ID)) {
      throw new Error(`Default email template ${DEFAULT_TEMPLATE_ID}.hbs is missing from ${TEMPLATES_DIR}.`);
    }
    this.logger.info({ templateIds: [...this.templates.keys()] }, 'Email templates loaded.');
  }

  /** Missing, null or unknown templateId → the default layout. */
  render(
    templateId: number | null | undefined,
    variables: Record<string, string | null | undefined>,
  ): { html: string; templateId: number } {
    let id = templateId ?? DEFAULT_TEMPLATE_ID;
    if (!this.templates.has(id)) {
      this.logger.warn({ templateId: id }, 'Unknown email template id - using the default.');
      id = DEFAULT_TEMPLATE_ID;
    }
    return { html: this.templates.get(id)!(variables), templateId: id };
  }
}
