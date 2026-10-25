import { PinoLogger } from 'nestjs-pino';
import { DEFAULT_TEMPLATE_ID, MailTemplateService } from './mail-template.service';

describe('MailTemplateService', () => {
  let service: MailTemplateService;

  beforeEach(() => {
    const logger = { setContext: jest.fn(), info: jest.fn(), warn: jest.fn() } as unknown as PinoLogger;
    service = new MailTemplateService(logger);
    service.onModuleInit();
  });

  it.each([undefined, null, 999])('falls back to the default layout for templateId %p', (templateId) => {
    expect(service.render(templateId, { centerName: 'Sunrise' }).templateId).toBe(DEFAULT_TEMPLATE_ID);
  });

  it('inserts bodyHtml unescaped and escapes every other variable', () => {
    const { html } = service.render(1, {
      centerName: '<b>Sunrise</b>',
      bodyHtml: '<p>Welcome!</p>',
    });

    expect(html).toContain('<p>Welcome!</p>');
    expect(html).toContain('&lt;b&gt;Sunrise&lt;/b&gt;');
  });

  it('renders the credentials block only when a username is given', () => {
    expect(service.render(1, { centerName: 'A' }).html).not.toContain('Username');

    const { html } = service.render(1, { centerName: 'A', username: 'P123', pin: '4321' });
    expect(html).toContain('P123');
    expect(html).toContain('4321');
  });

  it('replaces all six advertised placeholders using login username for parent_ID', () => {
    const { html } = service.render(1, {
      bodyHtml: '<p>@parent_name | @parent_ID | @parent_PIN | @center_name | @center_address | @center_land_line</p>',
      parentName: 'Parent',
      username: 'login-123',
      pin: '0042',
      centerName: 'Center',
      centerAddress: 'Street',
      centerLandLine: '555-0100',
    });

    expect(html).toContain('<p>Parent | login-123 | 0042 | Center | Street | 555-0100</p>');
  });

  it('escapes substituted values while preserving authored HTML and repeated tokens', () => {
    const { html } = service.render(1, {
      bodyHtml: '<p class="welcome">@parent_name, @parent_name: <strong>@parent_PIN</strong></p>',
      parentName: '<img src=x onerror="alert(1)"> & Parent',
      pin: "<0042>'\"",
    });

    expect(html).toContain('<p class="welcome">&lt;img src&#x3D;x onerror&#x3D;&quot;alert(1)&quot;&gt; &amp; Parent,');
    expect(html).toContain('<strong>&lt;0042&gt;&#x27;&quot;</strong></p>');
    expect(html).not.toContain('<img src=x');
  });

  it('does not recursively substitute values or evaluate authored Handlebars expressions', () => {
    const { html } = service.render(1, {
      bodyHtml: '<p>@parent_name / @center_name / {{username}}</p>',
      parentName: '@center_name',
      centerName: '@parent_ID',
      username: 'secret-login',
    });

    expect(html).toContain('<p>@center_name / @parent_ID / {{username}}</p>');
  });

  it('uses empty strings for missing values and preserves unknown placeholder names', () => {
    const { html } = service.render(null, {
      bodyHtml: '<p>@parent_name|@center_address|@center_name_extra|@unknown</p>',
      parentName: null,
    });

    expect(html).toContain('<p>||@center_name_extra|@unknown</p>');
  });
});
