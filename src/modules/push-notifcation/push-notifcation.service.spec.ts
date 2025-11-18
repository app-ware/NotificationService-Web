import { Test, TestingModule } from '@nestjs/testing';
import { PushNotifcationService } from './push-notifcation.service';

describe('PushNotifcationService', () => {
  let service: PushNotifcationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PushNotifcationService],
    }).compile();

    service = module.get<PushNotifcationService>(PushNotifcationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
