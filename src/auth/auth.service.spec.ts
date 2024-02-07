import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ForbiddenException } from '@nestjs/common';
import * as argon from 'argon2';
import { authDto, authResponse, user } from '../../test/utils/test-objects';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

describe('AuthService', () => {
  let authService: AuthService;
  let prismaService: PrismaService;
  let jwtService: JwtService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, ConfigService],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
    configService = module.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(jwtService).toBeDefined();
    expect(configService).toBeDefined();
  });

  describe('signup', () => {
    it('should create a new user and return a token', async () => {
      const hashSpy = jest
        .spyOn(argon, 'hash')
        .mockResolvedValue('hashed_password');
      jest.spyOn(prismaService.user, 'create').mockResolvedValue(user);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue(authResponse.access_token);

      const result = await authService.signup(authDto);

      expect(hashSpy).toHaveBeenCalledWith(authDto.password);
      expect(prismaService.user.create).toHaveBeenCalledWith({
        data: { email: authDto.email, hash: 'hashed_password' },
      });
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        { sub: user.id, email: user.email },
        { expiresIn: '15m', secret: 'super-secret' },
      );
      expect(result).toEqual(authResponse);

      hashSpy.mockRestore();
    });

    it('should throw ForbiddenException when PrismaClientKnownRequestError with code P2002 occurs', async () => {
      const prismaError = new PrismaClientKnownRequestError('message', {
        code: 'P2002',
        clientVersion: '1.0',
        meta: {},
        batchRequestIdx: 0,
      });

      jest.spyOn(argon, 'hash').mockResolvedValue('hashed_password');
      jest.spyOn(prismaService.user, 'create').mockRejectedValue(prismaError);

      await expect(authService.signup(authDto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw error when unexpected error occurs during user creation', async () => {
      const unexpectedError = new Error('Unexpected error');

      jest.spyOn(argon, 'hash').mockResolvedValue('hashed_password');
      jest
        .spyOn(prismaService.user, 'create')
        .mockRejectedValue(unexpectedError);

      await expect(authService.signup(authDto)).rejects.toThrow(
        unexpectedError,
      );
    });
  });

  describe('signin', () => {
    it('should sign in user and return a token', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(argon, 'verify').mockResolvedValue(true);
      jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue(authResponse.access_token);

      const result = await authService.signin(authDto);

      expect(prismaService.user.findUnique).toHaveBeenCalledWith({
        where: { email: authDto.email },
      });
      expect(argon.verify).toHaveBeenCalledWith(user.hash, authDto.password);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        { sub: user.id, email: user.email },
        { expiresIn: '15m', secret: 'super-secret' },
      );
      expect(result).toEqual(authResponse);
    });

    it('should throw ForbiddenException when credentials are incorrect', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(null);

      await expect(authService.signin(authDto)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should throw ForbiddenException when password does not match', async () => {
      jest.spyOn(prismaService.user, 'findUnique').mockResolvedValue(user);
      jest.spyOn(argon, 'verify').mockResolvedValue(false);

      await expect(authService.signin(authDto)).rejects.toThrow(
        ForbiddenException,
      );
    });
  });
});
