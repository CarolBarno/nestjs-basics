import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { EditUserDto, UserResponse } from './dto';
import { UserService } from './user.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';

@UseGuards(JwtGuard)
@Controller('users')
@ApiTags('Users APIs')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiResponse({ type: UserResponse })
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  @ApiResponse({ type: UserResponse })
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
