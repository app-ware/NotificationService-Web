import { Test, TestingModule } from '@nestjs/testing';
import { PushNotifcationController } from './push-notifcation.controller';
import { PushNotifcationService } from './push-notifcation.service';

describe('PushNotifcationController', () => {
  let controller: PushNotifcationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PushNotifcationController],
      providers: [PushNotifcationService],
    }).compile();

    controller = module.get<PushNotifcationController>(PushNotifcationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
