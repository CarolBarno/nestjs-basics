import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "../../src/prisma/prisma.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { editUserDto, user } from "../../test/utils/test-objects";



describe('Bookmark Service', () => {
    let userController: UserController;
    let userServiceMock: Partial<UserService>;

    beforeEach(async () => {
        userServiceMock = {
            editUser: jest.fn()
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserController],
            providers: [
                { provide: UserService, useValue: userServiceMock },
                { provide: PrismaService, useValue: {} }
            ]
        }).compile();

        userController = module.get<UserController>(UserController);
    });

    describe('editUser', () => {
        it('should edit a user', async () => {
            const userId = 1;
            jest.spyOn(userServiceMock, 'editUser').mockResolvedValue(user);
            const result = await userController.editUser(userId, editUserDto);

            expect(userServiceMock.editUser).toHaveBeenCalledWith(userId, editUserDto);
            expect(result).toEqual(user);
        });
    });
});
