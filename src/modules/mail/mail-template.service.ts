import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import Handlebars from 'handlebars';
import { DEFAULT_MAIL_LAYOUT, EmailDesign, MAIL_LAYOUTS } from '../../config/rabbitmq/contracts/email-job';
import { MAIL_LABELS, MAIL_PALETTES, ResolvedDesign, resolveDesign } from './mail-design';

/** Copied next to the compiled service by the nest-cli `assets` entry. */
const LAYOUTS_DIR = join(__dirname, 'templates', 'layouts');

/** Legacy iCare Kids store pages (ICarePlayStore / ICareAppStore in the legacy web.config). */
const DEFAULT_APP_STORE_URL = 'https://itunes.apple.com/lb/app/icare-kids/id717741889?mt=8';
const DEFAULT_PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.icare.kids';

/**
 * Email layouts, one file per key: templates/layouts/<layoutKey>.hbs (keys listed in the
 * contract's MAIL_LAYOUTS). Every layout renders the same context - the job's variables plus
 * labels (en/ar), colors (theme + accent), direction and asset URLs - so adding a layout is
 * adding a file and its key.
 */
@Injectable()
export class MailTemplateService implements OnModuleInit {
  private readonly handlebars = Handlebars.create();
  private readonly layouts = new Map<string, Handlebars.TemplateDelegate>();
  private readonly assetsBaseUrl: string | null;
  private readonly storeLinks: { appStore: string; googlePlay: string };

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(MailTemplateService.name);
    this.assetsBaseUrl = this.configService.get<string>('MAIL_ASSETS_BASE_URL')?.replace(/\/+$/, '') || null;
    this.storeLinks = {
      appStore: this.configService.get<string>('MAIL_APP_STORE_URL') || DEFAULT_APP_STORE_URL,
      googlePlay: this.configService.get<string>('MAIL_PLAY_STORE_URL') || DEFAULT_PLAY_STORE_URL,
    };

    // Escapes the text first, then turns its line breaks into <br> - the center's message keeps
    // its paragraphs without ever being treated as HTML (Outlook ignores white-space: pre-wrap).
    this.handlebars.registerHelper('nl2br', (text: unknown) => {
      const escaped = this.handlebars.escapeExpression(String(text ?? ''));
      return new this.handlebars.SafeString(escaped.replace(/\r?\n/g, '<br>'));
    });
  }

  onModuleInit() {
    for (const file of readdirSync(LAYOUTS_DIR)) {
      const match = /^([a-z0-9-]+)\.hbs$/.exec(file);
      if (!match) continue;
      const source = readFileSync(join(LAYOUTS_DIR, file), 'utf8');
      this.layouts.set(match[1], this.handlebars.compile(source, { strict: false }));
    }

    const missing = MAIL_LAYOUTS.filter((key) => !this.layouts.has(key));
    if (missing.length) {
      throw new Error(`Email layouts missing from ${LAYOUTS_DIR}: ${missing.join(', ')}.`);
    }
    this.logger.info(
      { layouts: [...this.layouts.keys()], assetsBaseUrl: this.assetsBaseUrl ?? '(none - text fallbacks)' },
      'Email layouts loaded.',
    );
  }

  /** Missing, null or invalid design values → defaults (see resolveDesign). */
  render(
    design: EmailDesign | null | undefined,
    variables: Record<string, string | null | undefined>,
  ): { html: string; design: ResolvedDesign } {
    const resolved = resolveDesign(design);
    const layout = this.layouts.get(resolved.layoutKey) ?? this.layouts.get(DEFAULT_MAIL_LAYOUT)!;
    return { html: layout(this.buildContext(resolved, variables)), design: resolved };
  }

  private buildContext(design: ResolvedDesign, variables: Record<string, string | null | undefined>) {
    const rtl = design.language === 'ar';
    return {
      ...variables,
      // Older Nursery builds send the same plain text as `bodyHtml`.
      bodyText: variables.bodyText ?? variables.bodyHtml ?? '',
      lang: design.language,
      dir: rtl ? 'rtl' : 'ltr',
      align: rtl ? 'right' : 'left',
      alignEnd: rtl ? 'left' : 'right',
      colorScheme: design.theme,
      labels: MAIL_LABELS[design.language],
      colors: { ...MAIL_PALETTES[design.theme], accent: design.accentColor },
      showLogo: design.showLogo && !!variables.logoUrl,
      showStoreBadges: design.showStoreBadges,
      storeLinks: this.storeLinks,
      // Without a hosting location the layouts fall back to text (wordmark, link buttons).
      assets: this.assetsBaseUrl
        ? {
            icareLogo: `${this.assetsBaseUrl}/IcareLogo.png`,
            appStoreBadge: `${this.assetsBaseUrl}/AppStore.png`,
            googlePlayBadge: `${this.assetsBaseUrl}/GooglePlay.png`,
          }
        : null,
    };
  }
}
