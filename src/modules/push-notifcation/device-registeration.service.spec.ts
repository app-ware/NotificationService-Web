import { Test, TestingModule } from '@nestjs/testing';
import { DeviceRegisterationService } from './device-registeration.service';

describe('DeviceRegisterationService', () => {
  let service: DeviceRegisterationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceRegisterationService],
    }).compile();

    service = module.get<DeviceRegisterationService>(DeviceRegisterationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
