import {
  DEFAULT_MAIL_DESIGN,
  EmailDesign,
  MAIL_ACCENT_COLOR_PATTERN,
  MAIL_LAYOUTS,
  MAIL_THEMES,
  MailLanguage,
  MailLayoutKey,
  MailTheme,
} from '../../config/rabbitmq/contracts/email-job';

/** Every layout's accent unless a center picks one (defined in the contract). */
export const DEFAULT_ACCENT_COLOR = DEFAULT_MAIL_DESIGN.accentColor;

/** A design with every default applied - what a layout actually renders with. */
export interface ResolvedDesign {
  layoutKey: MailLayoutKey;
  theme: MailTheme;
  language: MailLanguage;
  accentColor: string;
  showLogo: boolean;
  showStoreBadges: boolean;
}

export function resolveDesign(design: EmailDesign | null | undefined): ResolvedDesign {
  const layoutKey = (MAIL_LAYOUTS as readonly string[]).includes(design?.layoutKey ?? '')
    ? (design!.layoutKey as MailLayoutKey)
    : DEFAULT_MAIL_DESIGN.layoutKey;
  const theme = (MAIL_THEMES as readonly string[]).includes(design?.theme ?? '')
    ? design!.theme!
    : DEFAULT_MAIL_DESIGN.theme;
  return {
    layoutKey,
    theme,
    language: design?.language === 'ar' ? 'ar' : DEFAULT_MAIL_DESIGN.language,
    accentColor: MAIL_ACCENT_COLOR_PATTERN.test(design?.accentColor ?? '') ? design!.accentColor! : DEFAULT_ACCENT_COLOR,
    showLogo: design?.showLogo ?? DEFAULT_MAIL_DESIGN.showLogo,
    showStoreBadges: design?.showStoreBadges ?? DEFAULT_MAIL_DESIGN.showStoreBadges,
  };
}

/**
 * Fixed wording around the center's own text. Arabic follows legacy email-template-arabic.html,
 * rendered as real RTL (dir="rtl") instead of legacy's reversed punctuation.
 */
export const MAIL_LABELS: Record<MailLanguage, Record<string, string>> = {
  en: {
    greeting: 'Dear',
    credentialsIntro: 'Your credentials are:',
    username: 'ID',
    pin: 'PIN',
    signOff: 'Best regards.',
    phone: 'Center Phone',
    download: 'Download the iCare app from',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    poweredBy: 'Powered by AppWare',
  },
  ar: {
    greeting: 'حضرة',
    credentialsIntro: 'بيانات الاعتماد الخاصة بك هي:',
    username: 'رقم الحساب',
    pin: 'الرقم السري',
    signOff: 'أطيب التمنيات.',
    phone: 'هاتف المركز',
    download: 'حمّل تطبيق iCare من',
    appStore: 'App Store',
    googlePlay: 'Google Play',
    poweredBy: 'Powered by AppWare',
  },
};

/**
 * Colors per theme, as inline-style values (email clients drop <style> blocks). `dark` is a
 * dark-designed email, not a toggle of the client's dark mode - the layouts declare their
 * color-scheme so clients don't invert them a second time.
 */
export const MAIL_PALETTES: Record<MailTheme, Record<string, string>> = {
  light: {
    page: '#f0f2f5',
    card: '#ffffff',
    panel: '#f6f8fb',
    border: '#e3e7ed',
    heading: '#111827',
    text: '#374151',
    muted: '#6b7280',
  },
  dark: {
    page: '#0f172a',
    card: '#1e293b',
    panel: '#273449',
    border: '#334155',
    heading: '#f8fafc',
    text: '#e2e8f0',
    muted: '#94a3b8',
  },
};
