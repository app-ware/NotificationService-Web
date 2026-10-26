import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PinoLogger } from 'nestjs-pino';
import request from 'supertest';
import { MailPreviewController } from './mail-preview.controller';
import { MailTemplateService } from './mail-template.service';

describe('MailPreviewController (POST /mail/preview)', () => {
  let app: INestApplication;

  const start = async (env: Record<string, string>) => {
    const config = { get: (key: string) => env[key] } as unknown as ConfigService;
    const logger = { setContext: jest.fn(), info: jest.fn(), warn: jest.fn() } as unknown as PinoLogger;
    const templates = new MailTemplateService(config, logger);
    templates.onModuleInit();

    const moduleRef = await Test.createTestingModule({
      controllers: [MailPreviewController],
      providers: [
        { provide: MailTemplateService, useValue: templates },
        { provide: ConfigService, useValue: config },
      ],
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  };

  afterEach(() => app?.close());

  const body = { design: { layoutKey: 'modern', language: 'ar' }, variables: { parentName: 'Mona', bodyText: 'Hi' } };

  it('renders the requested layout with a valid key', async () => {
    await start({ NOTIFICATION_SERVICE_API_KEY: 'secret' });
    const res = await request(app.getHttpServer()).post('/mail/preview').set('X-Internal-API-Key', 'secret').send(body);

    expect(res.status).toBe(200);
    expect(res.body.design).toEqual(expect.objectContaining({ layoutKey: 'modern', language: 'ar' }));
    expect(res.body.html).toContain('dir="rtl"');
  });

  it('rejects a wrong or missing key', async () => {
    await start({ NOTIFICATION_SERVICE_API_KEY: 'secret' });
    expect((await request(app.getHttpServer()).post('/mail/preview').set('X-Internal-API-Key', 'nope').send(body)).status).toBe(401);
    expect((await request(app.getHttpServer()).post('/mail/preview').send(body)).status).toBe(401);
  });

  it('fails closed (503) when no key is configured', async () => {
    await start({});
    const res = await request(app.getHttpServer()).post('/mail/preview').set('X-Internal-API-Key', '').send(body);
    expect(res.status).toBe(503);
  });

  it('rejects a body without variables', async () => {
    await start({ NOTIFICATION_SERVICE_API_KEY: 'secret' });
    const res = await request(app.getHttpServer()).post('/mail/preview').set('X-Internal-API-Key', 'secret').send({ design: {} });
    expect(res.status).toBe(400);
  });
});
