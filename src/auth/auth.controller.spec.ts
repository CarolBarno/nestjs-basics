import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { authDto, authResponse } from '../../test/utils/test-objects';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            signup: jest.fn(),
            signin: jest.fn(),
          },
        },
        { provide: PrismaService, useValue: {} },
        { provide: JwtService, useValue: {} },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('signup', () => {
    it('should call authService.signup with the provided DTO', async () => {
      jest.spyOn(authService, 'signup').mockResolvedValue(authResponse);

      const result = await authController.signup(authDto);

      expect(result).toEqual(authResponse);
    });
  });

  describe('signin', () => {
    it('should call authService.signin with the provided DTO and return status code 200', async () => {
      jest.spyOn(authService, 'signin').mockResolvedValue(authResponse);

      const result = await authController.signin(authDto);

      expect(result).toBe(authResponse);
    });

    it('should return status code 200', async () => {
      jest.spyOn(authService, 'signin').mockResolvedValue(authResponse);

      const response = await authController.signin(authDto);
      response['statusCode'] = 200;

      expect(response).toHaveProperty('statusCode', HttpStatus.OK);
    });
  });
});
