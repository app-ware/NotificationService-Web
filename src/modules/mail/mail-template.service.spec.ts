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
});
