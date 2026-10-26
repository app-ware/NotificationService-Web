/**
 * `email.send` payload - CONTRACT, keep identical in NurseryServices-Web.
 *
 * Nursery sends DATA (variables + the center's design choices); this service owns all HTML:
 * the layouts in src/modules/mail/templates/layouts/<layoutKey>.hbs. Payloads may carry
 * credentials (parent PIN) - never log them.
 */

/** Layouts this service ships. Nursery validates a center's choice against this list. */
export const MAIL_LAYOUTS = ['classic', 'modern'] as const;
export type MailLayoutKey = (typeof MAIL_LAYOUTS)[number];
export const DEFAULT_MAIL_LAYOUT: MailLayoutKey = 'classic';

export const MAIL_THEMES = ['light', 'dark'] as const;
export type MailTheme = (typeof MAIL_THEMES)[number];

export type MailLanguage = 'en' | 'ar';

/** What every missing / null / invalid design field falls back to - one definition for both sides. */
export const DEFAULT_MAIL_DESIGN = {
  layoutKey: DEFAULT_MAIL_LAYOUT,
  theme: 'light' as MailTheme,
  language: 'en' as MailLanguage,
  /** iCare brand blue (iCareWebApp's primary). */
  accentColor: '#15688E',
  showLogo: true,
  showStoreBadges: true,
} as const;

/** The only accepted accentColor shape - the value lands inside inline style attributes. */
export const MAIL_ACCENT_COLOR_PATTERN = /^#[0-9a-fA-F]{6}$/;

/**
 * A center's design choices. Every field is optional - missing, null or invalid falls back to
 * DEFAULT_MAIL_DESIGN, so a job without `design` renders exactly like a center that never chose.
 */
export interface EmailDesign {
  /** One of MAIL_LAYOUTS; unknown → DEFAULT_MAIL_LAYOUT. */
  layoutKey?: string | null;
  /** → 'light'. */
  theme?: MailTheme | null;
  /** Labels + direction (ar = right-to-left); → 'en'. */
  language?: MailLanguage | null;
  /** '#rrggbb'; anything else → the layout's brand color. */
  accentColor?: string | null;
  /** Show the center's logo (when it has one); → true. */
  showLogo?: boolean | null;
  /** Show the App Store / Google Play links; → true. */
  showStoreBadges?: boolean | null;
}

export interface EmailJob {
  jobId: string;
  correlationId?: string;
  createdAt: string;
  to: string | string[];
  subject: string;
  /** Overrides MAIL_FROM for this one send. */
  from?: string;
  design?: EmailDesign;
  /** @deprecated Numbered layouts were replaced by `design.layoutKey`; ignored when present. */
  templateId?: number | null;
  /**
   * Layout variables, all plain text - the layout HTML-escapes every value. `bodyText` is the
   * center's message (line breaks kept). `bodyHtml` is the pre-2026-10-25 name for the same
   * text, still accepted so jobs from an older Nursery render; prefer `bodyText`.
   */
  variables: Record<string, string | null | undefined>;
  meta?: Record<string, string | number>;
}

/** What a send produced - handed to MailResultPublisher (a no-op until `email.result` exists). */
export interface EmailResult {
  jobId: string;
  success: boolean;
  /** Provider message id when the send succeeded. */
  providerId?: string;
  error?: string;
  meta?: Record<string, string | number>;
}
