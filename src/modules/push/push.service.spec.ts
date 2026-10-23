import { PinoLogger } from 'nestjs-pino';
import { DeviceType, PushJob, PushNotificationType } from '../../config/rabbitmq/contracts/push-job';
import { PushService } from './push.service';
import { FcmService } from './fcm.service';
import { ApnService } from './apn.service';

const ok = (n: number) => ({ successCount: n, failures: [] });

describe('PushService', () => {
  let fcm: { sendMulticast: jest.Mock; sendEach: jest.Mock };
  let apn: { send: jest.Mock };
  let service: PushService;

  const job = (overrides: Partial<PushJob> = {}): PushJob => ({
    jobId: 'job-1',
    createdAt: '2026-10-23T10:00:00Z',
    centerId: 1,
    notificationType: PushNotificationType.Notification,
    audience: 'parent',
    message: 'Hello',
    apnBundleId: 'com.appware.icarekids',
    recipients: [],
    ...overrides,
  });

  beforeEach(() => {
    fcm = {
      sendMulticast: jest.fn((tokens: string[]) => Promise.resolve(ok(tokens.length))),
      sendEach: jest.fn((messages: unknown[]) => Promise.resolve(ok(messages.length))),
    };
    apn = { send: jest.fn((_b: string, tokens: string[]) => Promise.resolve(ok(tokens.length))) };
    const logger = { setContext: jest.fn() } as unknown as PinoLogger;
    service = new PushService(fcm as unknown as FcmService, apn as unknown as ApnService, logger);
  });

  it('sends one FCM multicast per parent with that parent id and the enum name as type', async () => {
    const result = await service.dispatch(
      job({
        recipients: [
          { deviceToken: 'a1', userId: 'P1', deviceType: DeviceType.Android },
          { deviceToken: 'a2', userId: 'P1', deviceType: DeviceType.Android },
          { deviceToken: 'a3', userId: 'P2', deviceType: DeviceType.Android },
        ],
      }),
    );

    expect(fcm.sendMulticast).toHaveBeenCalledTimes(2);
    expect(fcm.sendMulticast).toHaveBeenCalledWith(
      ['a1', 'a2'],
      expect.objectContaining({ ParentId: 'P1', type: 'Notification', message: 'Hello' }),
    );
    expect(fcm.sendMulticast).toHaveBeenCalledWith(['a3'], expect.objectContaining({ ParentId: 'P2' }));
    expect(result.fcm).toEqual(ok(3));
    expect(apn.send).not.toHaveBeenCalled();
  });

  it('sends parent iOS through APN with the job bundle and a per-token payload', async () => {
    await service.dispatch(
      job({ recipients: [{ deviceToken: 'i1', userId: 'P1', deviceType: DeviceType.Ios }] }),
    );

    expect(apn.send).toHaveBeenCalledWith('com.appware.icarekids', ['i1'], 'Hello', expect.any(Function));
    const buildPayload = apn.send.mock.calls[0][3];
    expect(buildPayload('i1')).toEqual(expect.objectContaining({ Token: 'i1', type: 'Notification' }));
  });

  it('skips parent iOS with a warning when the job has no bundle', async () => {
    const result = await service.dispatch(
      job({
        apnBundleId: null,
        recipients: [{ deviceToken: 'i1', userId: 'P1', deviceType: DeviceType.Ios }],
      }),
    );

    expect(apn.send).not.toHaveBeenCalled();
    expect(result.warnings).toHaveLength(1);
  });

  it('sends providers per device through FCM with UserId, type 1, and a notification block on iOS only', async () => {
    await service.dispatch(
      job({
        audience: 'provider',
        notificationType: PushNotificationType.Provider,
        recipients: [
          { deviceToken: 'pa', userId: '77', deviceType: DeviceType.Android },
          { deviceToken: 'pi', userId: '78', deviceType: DeviceType.Ios },
        ],
      }),
    );

    expect(apn.send).not.toHaveBeenCalled();
    const [messages] = fcm.sendEach.mock.calls[0];
    expect(messages[0]).toEqual({ token: 'pa', data: expect.objectContaining({ UserId: '77', type: '1', Token: 'pa' }) });
    expect(messages[0].notification).toBeUndefined();
    expect(messages[1].notification).toEqual({ title: 'Notification', body: 'Hello' });
  });

  it('returns a warning and sends nothing when no recipient has a token', async () => {
    const result = await service.dispatch(
      job({ recipients: [{ deviceToken: '', userId: 'P1', deviceType: DeviceType.Android }] }),
    );

    expect(fcm.sendMulticast).not.toHaveBeenCalled();
    expect(result.warnings).toHaveLength(1);
  });

  it('throws on a malformed job so it is dead-lettered', async () => {
    await expect(service.dispatch({ ...job(), recipients: undefined } as unknown as PushJob)).rejects.toThrow(
      'Invalid push job',
    );
    await expect(service.dispatch(job({ audience: 'teacher' as never }))).rejects.toThrow('unknown audience');
  });
});
