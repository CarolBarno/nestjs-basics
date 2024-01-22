import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { authDto } from '../../test/utils/test-objects';

describe('AuthController', () => {
    let authController: AuthController;
    let authServiceMock: Partial<AuthService>;

    beforeEach(async () => {
        authServiceMock = {
            signup: jest.fn(),
            signin: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                { provide: PrismaService, useValue: {} },
                { provide: JwtService, useValue: {} },
                { provide: ConfigService, useValue: {} },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
    });

    describe('signup', () => {
        it('should signup', async () => {

            jest.spyOn(authServiceMock, 'signup').mockResolvedValue({
                access_token: 'mockAccessToken',
            });

            const result = await authController.signup(authDto);

            expect(authServiceMock.signup).toHaveBeenCalledWith(authDto);
            expect(result).toEqual({
                access_token: 'mockAccessToken',
            });
        });
    });

    describe('signin', () => {
        it('should signin', async () => {

            jest.spyOn(authServiceMock, 'signin').mockResolvedValue({
                access_token: 'mockAccessToken',
            });

            const result = await authController.signin(authDto);

            expect(authServiceMock.signin).toHaveBeenCalledWith(authDto);
            expect(result).toEqual({
                access_token: 'mockAccessToken',
            });
        });
    });
});
