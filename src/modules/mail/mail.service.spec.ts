import { ConfigService } from '@nestjs/config';
import { PinoLogger } from 'nestjs-pino';
import { MailTemplateService } from './mail-template.service';
import { MailService } from './mail.service';
import type { EmailJob } from '../../config/rabbitmq/contracts/email-job';

// Provider calls stay isolated from network access while exercising the real renderer below.
const mockSend = jest.fn();
jest.mock(
  'resend',
  () => ({
    Resend: jest
      .fn()
      .mockImplementation(() => ({ emails: { send: mockSend } })),
  }),
);

describe('MailService delivery contract', () => {
  const job: EmailJob = {
    jobId: 'mail-job-42',
    createdAt: '2026-10-25T12:00:00.000Z',
    to: 'controlled@example.com',
    subject: 'Credentials',
    variables: { bodyHtml: '<p>Hello @parent_name</p>', parentName: 'Sam' },
    meta: { kind: 'parent-credentials', centerId: 10, parentId: '00042' },
  };
  const template = {
    render: jest.fn(() => ({ html: '<p>Hello Sam</p>', templateId: 1 })),
  };
  const logger = { setContext: jest.fn(), warn: jest.fn() };
  const create = (configured = true) =>
    new MailService(
      {
        get: (key: string) =>
          key === 'RESEND_API_KEY'
            ? configured
              ? 'test-key'
              : undefined
            : 'sender@example.com',
      } as ConfigService,
      template as unknown as MailTemplateService,
      logger as unknown as PinoLogger,
    );

  beforeEach(() => {
    mockSend
      .mockReset()
      .mockResolvedValue({ data: { id: 'provider-42' }, error: null });
    template.render.mockClear();
  });

  it('renders the job and uses the same provider idempotency key on redelivery', async () => {
    const service = create();
    await expect(service.send(job)).resolves.toMatchObject({
      success: true,
      providerId: 'provider-42',
      jobId: job.jobId,
    });
    await service.send(job);
    // Third argument = the job's template key (absent here → the service defaults to parent credentials).
    expect(template.render).toHaveBeenCalledWith(undefined, job.variables, undefined);
    expect(mockSend).toHaveBeenCalledTimes(2);
    for (const call of mockSend.mock.calls) {
      expect(call).toEqual([
        {
          from: 'sender@example.com',
          to: job.to,
          subject: job.subject,
          html: '<p>Hello Sam</p>',
        },
        { idempotencyKey: job.jobId },
      ]);
    }
  });

  it('returns a provider rejection as a failed result for acknowledgement', async () => {
    mockSend.mockResolvedValue({
      data: null,
      error: { message: 'Address rejected' },
    });
    await expect(create().send(job)).resolves.toMatchObject({
      jobId: job.jobId,
      success: false,
      error: 'Address rejected',
      meta: job.meta,
    });
  });

  it('passes the real rendered, escaped body to the provider', async () => {
    const renderer = new MailTemplateService(
      { get: () => undefined } as unknown as ConfigService,
      { setContext: jest.fn(), info: jest.fn(), warn: jest.fn() } as unknown as PinoLogger,
    );
    renderer.onModuleInit();
    const service = new MailService(
      {
        get: (key: string) =>
          key === 'RESEND_API_KEY' ? 'test-key' : 'sender@example.com',
      } as ConfigService,
      renderer,
      logger as unknown as PinoLogger,
    );
    const parentJob: EmailJob = {
      ...job,
      variables: {
        bodyText: 'Dear Sam <script>alert(1)</script>,\nyour PIN is <0007>.',
        parentName: 'Sam',
        username: 'login-00042',
        pin: '<0007>',
        centerName: 'Center & family',
      },
    };

    await service.send(parentJob);

    const [payload, options] = mockSend.mock.calls[0];
    expect(payload.html).toContain('Dear Sam &lt;script&gt;alert(1)&lt;/script&gt;,<br>your PIN is &lt;0007&gt;.');
    expect(payload.html).not.toContain('<script>');
    expect(payload.to).toBe(parentJob.to);
    expect(options).toEqual({ idempotencyKey: parentJob.jobId });
  });

  it('propagates a provider network failure for dead-letter handling', async () => {
    mockSend.mockRejectedValue(new Error('provider unavailable'));
    await expect(create().send(job)).rejects.toThrow('provider unavailable');
  });

  it('rejects missing provider configuration without attempting a send', async () => {
    await expect(create(false).send(job)).rejects.toThrow(
      'RESEND_API_KEY missing',
    );
    expect(mockSend).not.toHaveBeenCalled();
  });

  it('rejects malformed jobs before rendering or contacting the provider', async () => {
    await expect(create().send({ ...job, to: [] })).rejects.toThrow(
      'Invalid email job',
    );
    expect(template.render).not.toHaveBeenCalled();
    expect(mockSend).not.toHaveBeenCalled();
  });
});
