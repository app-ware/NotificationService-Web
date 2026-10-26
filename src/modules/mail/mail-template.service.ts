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
/** The new system's home - the footer link and the logo's target (legacy linked app-ware.com). */
const DEFAULT_PORTAL_URL = 'https://icare-portal.com/en';
/**
 * The portal already serves the current iCare logo publicly (iCareWebApp
 * public/assets/images/logos/LogoHQ.png). PNG on purpose: Outlook doesn't render WebP.
 */
const DEFAULT_LOGO_URL = 'https://icare-portal.com/en/assets/images/logos/LogoHQ.png';

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
  private readonly links: { appStore: string; googlePlay: string; portal: string };
  private readonly images: { logo: string; appStoreBadge: string | null; googlePlayBadge: string | null };

  constructor(
    private readonly configService: ConfigService,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(MailTemplateService.name);
    const env = (key: string) => this.configService.get<string>(key) || null;
    this.links = {
      appStore: env('MAIL_APP_STORE_URL') ?? DEFAULT_APP_STORE_URL,
      googlePlay: env('MAIL_PLAY_STORE_URL') ?? DEFAULT_PLAY_STORE_URL,
      portal: env('MAIL_PORTAL_URL') ?? DEFAULT_PORTAL_URL,
    };
    // Badges have no public home yet (assets/email/README.md) - unset → text link buttons.
    this.images = {
      logo: env('MAIL_LOGO_URL') ?? DEFAULT_LOGO_URL,
      appStoreBadge: env('MAIL_APP_STORE_BADGE_URL'),
      googlePlayBadge: env('MAIL_GOOGLE_PLAY_BADGE_URL'),
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
      { layouts: [...this.layouts.keys()], storeBadges: this.images.appStoreBadge ? 'images' : 'text buttons' },
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
      links: this.links,
      logoImage: this.images.logo,
      // Both badge images or neither - one image beside one text button looks broken.
      badgeImages:
        this.images.appStoreBadge && this.images.googlePlayBadge
          ? { appStore: this.images.appStoreBadge, googlePlay: this.images.googlePlayBadge }
          : null,
    };
  }
}
