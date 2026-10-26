import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { MAIL_LAYOUTS } from '../../config/rabbitmq/contracts/email-job';
import { DEFAULT_ACCENT_COLOR, MAIL_PALETTES } from './mail-design';
import { MailTemplateService } from './mail-template.service';

describe('MailTemplateService', () => {
  const logger = { setContext: jest.fn(), info: jest.fn(), warn: jest.fn() } as unknown as PinoLogger;
  const create = (env: Record<string, string> = {}) => {
    const service = new MailTemplateService({ get: (key: string) => env[key] } as unknown as ConfigService, logger);
    service.onModuleInit();
    return service;
  };

  const variables = {
    centerName: 'Sunrise',
    centerAddress: 'Cairo',
    centerLandLine: '0225',
    logoUrl: 'https://files.example/10000/logo/logo.png',
    parentName: 'Mona',
    username: '01410445411',
    pin: '4321',
    bodyText: 'Welcome to the app.\nSee you soon.',
  };

  let service: MailTemplateService;
  beforeEach(() => {
    service = create();
  });

  it('classic shows the portal-hosted iCare logo by default, overridable by MAIL_LOGO_URL', () => {
    expect(service.render({ layoutKey: 'classic' }, variables).html).toContain(
      'https://icare-portal.com/en/assets/images/logos/LogoHQ.png',
    );
    expect(
      create({ MAIL_LOGO_URL: 'https://files.example/email/logo.png' }).render({ layoutKey: 'classic' }, variables).html,
    ).toContain('https://files.example/email/logo.png');
  });

  describe('design resolution', () => {
    it.each([undefined, null, {}, { layoutKey: 'nope' }])('falls back to classic/light/en for %p', (design) => {
      expect(service.render(design as never, variables).design).toEqual({
        layoutKey: 'classic',
        theme: 'light',
        language: 'en',
        accentColor: DEFAULT_ACCENT_COLOR,
        showLogo: true,
        showStoreBadges: true,
      });
    });

    it('ignores an accent color that is not #rrggbb (values land inside style attributes)', () => {
      expect(service.render({ accentColor: 'red;background:url(x)' }, variables).design.accentColor).toBe(DEFAULT_ACCENT_COLOR);
      expect(service.render({ accentColor: '#AA00ff' }, variables).design.accentColor).toBe('#AA00ff');
    });
  });

  describe.each(MAIL_LAYOUTS)('layout "%s"', (layoutKey) => {
    const render = (design = {}, vars: Record<string, string | null> = variables) =>
      service.render({ layoutKey, ...design }, vars).html;

    it('escapes the body text and keeps its line breaks', () => {
      const html = render({}, { ...variables, bodyText: '<script>x</script>\nLine 2' });
      expect(html).toContain('&lt;script&gt;x&lt;/script&gt;<br>Line 2');
      expect(html).not.toContain('<script>');
    });

    it('escapes every other value', () => {
      expect(render({}, { ...variables, centerName: '<b>Sun</b>' })).toContain('&lt;b&gt;Sun&lt;/b&gt;');
    });

    it('renders the credentials and greeting', () => {
      const html = render();
      expect(html).toContain('Dear Mona,');
      expect(html).toContain('01410445411');
      expect(html).toContain('4321');
    });

    it('switches to Arabic labels and right-to-left', () => {
      const html = render({ language: 'ar' });
      expect(html).toContain('dir="rtl"');
      expect(html).toContain('lang="ar"');
      expect(html).toContain('حضرة Mona,');
      expect(html).toContain('الرقم السري');
    });

    it('applies the theme palette, the accent color and the matching color-scheme', () => {
      const html = render({ theme: 'dark', accentColor: '#AA00FF' });
      expect(html).toContain(MAIL_PALETTES.dark.card);
      expect(html).toContain('#AA00FF');
      expect(html).toContain('content="dark"');
    });

    it('hides the center logo when turned off or when the center has none', () => {
      expect(render()).toContain(variables.logoUrl);
      expect(render({ showLogo: false })).not.toContain(variables.logoUrl);
      expect(render({}, { ...variables, logoUrl: null })).not.toContain('<img src="" ');
    });

    it('shows store links (text buttons without hosted assets) and hides them when turned off', () => {
      const html = render();
      // Handlebars escapes "=" in attributes as &#x3D; - decoded back by every client.
      expect(html).toContain('play.google.com/store/apps/details?id&#x3D;com.icare.kids');
      expect(html).toContain('itunes.apple.com/lb/app/icare-kids/id717741889');
      expect(html).not.toContain('GooglePlay.png');
      expect(render({ showStoreBadges: false })).not.toContain('play.google.com');
    });

    it('links to the portal, not the legacy app-ware.com site', () => {
      const html = render();
      expect(html).toContain('href="https://icare-portal.com/en"');
      expect(html).not.toContain('app-ware.com');
    });

    it('uses badge images only when both are configured', () => {
      const both = create({
        MAIL_APP_STORE_BADGE_URL: 'https://files.example/email/AppStore.png',
        MAIL_GOOGLE_PLAY_BADGE_URL: 'https://files.example/email/GooglePlay.png',
      }).render({ layoutKey }, variables).html;
      expect(both).toContain('https://files.example/email/AppStore.png');
      expect(both).toContain('https://files.example/email/GooglePlay.png');

      const one = create({ MAIL_APP_STORE_BADGE_URL: 'https://files.example/email/AppStore.png' })
        .render({ layoutKey }, variables).html;
      expect(one).not.toContain('AppStore.png');
    });

    it('still renders a job from an older Nursery that sends the text as bodyHtml', () => {
      const { bodyText, ...rest } = variables;
      expect(render({}, { ...rest, bodyHtml: 'Old field <b>text</b>' })).toContain('Old field &lt;b&gt;text&lt;/b&gt;');
    });
  });

  it('treats the body as plain text: no HTML, no Handlebars, no worker-side @placeholder replacement', () => {
    // Nursery replaces @parent_name & co. before queueing; the worker must not interpret anything.
    const { html } = service.render(null, {
      bodyText: '<img src=x onerror="alert(1)"> {{username}} @parent_PIN',
      username: 'secret-login',
      pin: '0042',
    });

    expect(html).toContain('&lt;img src&#x3D;x onerror&#x3D;&quot;alert(1)&quot;&gt; {{username}} @parent_PIN');
    expect(html).not.toContain('<img src=x');
  });
});
