import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtGuard } from '../auth/guard';
import { editUserDto, user } from '../../test/utils/test-objects';
import { EditUserDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import { GetUser } from '../auth/decorator';
import { ExecutionContext } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService, { provide: PrismaService, useValue: {} }],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('editUser', () => {
    it('should return the result from userService', async () => {
      const userId = 1;
      const dto: EditUserDto = editUserDto;
      jest.spyOn(userService, 'editUser').mockResolvedValueOnce(user);

      const result = await controller.editUser(userId, dto);

      expect(result).toEqual(user);
      expect(userService.editUser).toHaveBeenCalledWith(userId, dto);
    });
  });
});
