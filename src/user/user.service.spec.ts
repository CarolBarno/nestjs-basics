import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { editUserDto, user } from '../../test/utils/test-objects';

describe('UserService', () => {
  let userService: UserService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('editUser', () => {
    it('should edit a user and return the updated user without hash', async () => {
      const userId = 1;
      const prismaUpdateMock = jest
        .spyOn(prismaService.user, 'update')
        .mockResolvedValue(user);

      const result = await userService.editUser(userId, editUserDto);

      expect(prismaUpdateMock).toHaveBeenCalledWith({
        where: { id: userId },
        data: { ...editUserDto },
      });

      expect(result).toEqual(
        expect.not.objectContaining({ hash: expect.any(String) }),
      );
      expect(result).toEqual(user);
    });
  });
});
