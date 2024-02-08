import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import {
  HealthCheckResult,
  HealthCheckService,
  TerminusModule,
} from '@nestjs/terminus';
import { healthResponse } from '../../test/utils/test-objects';
import { HealthModule } from './health.module';

describe('HealthController', () => {
  let controller: HealthController;
  let healthCheckService: HealthCheckService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HealthModule, TerminusModule],
      controllers: [HealthController],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    healthCheckService = module.get<HealthCheckService>(HealthCheckService);

    jest
      .spyOn(healthCheckService, 'check')
      .mockResolvedValue(healthResponse as HealthCheckResult);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('check()', () => {
    it('should call health check service with correct parameters', async () => {
      const result = await controller.check();
      expect(result).toEqual(healthResponse);
    });
  });

  describe('checkDisk()', () => {
    it('should call health check service with disk check', async () => {
      const spy = jest
        .spyOn(healthCheckService, 'check')
        .mockResolvedValue(healthResponse as HealthCheckResult);

      await controller.checkDisk();

      expect(spy).toHaveBeenCalledWith([expect.any(Function)]);
    });
  });

  describe('checkMemory()', () => {
    it('should call health check service with memory check', async () => {
      const spy = jest
        .spyOn(healthCheckService, 'check')
        .mockResolvedValue(healthResponse as HealthCheckResult);

      await controller.checkMemory();

      expect(spy).toHaveBeenCalledWith([expect.any(Function)]);
    });
  });
});
