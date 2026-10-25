import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import Handlebars from 'handlebars';

export const DEFAULT_TEMPLATE_ID = 1;

/** Copied next to the compiled service by the nest-cli `assets` entry. */
const TEMPLATES_DIR = join(__dirname, 'templates');

/** Legacy body placeholders exposed by the parent email editor. */
const BODY_PLACEHOLDER_VARIABLES: Readonly<Record<string, string>> = {
  '@parent_name': 'parentName',
  '@parent_ID': 'username',
  '@parent_PIN': 'pin',
  '@center_name': 'centerName',
  '@center_address': 'centerAddress',
  '@center_land_line': 'centerLandLine',
};

const BODY_PLACEHOLDER_PATTERN =
  /@(parent_name|parent_ID|parent_PIN|center_name|center_address|center_land_line)(?![A-Za-z0-9_])/g;

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
    // Replace the original authored body in one pass. Values are escaped before entering
    // the triple-brace HTML slot; tokens inside a value are never interpreted again.
    const bodyHtml = variables.bodyHtml?.replace(BODY_PLACEHOLDER_PATTERN, (token) =>
      Handlebars.escapeExpression(variables[BODY_PLACEHOLDER_VARIABLES[token]] ?? ''),
    );
    return {
      html: this.templates.get(id)!({ ...variables, bodyHtml }),
      templateId: id,
    };
  }
}
