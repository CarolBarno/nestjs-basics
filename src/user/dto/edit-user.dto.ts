import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class EditUserDto {
  @ApiProperty({
    description: 'Email of the user',
    example: 'janedoe@gmail,com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Firstname of the user',
    example: 'jane',
  })
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiProperty({
    description: 'Lastname of the user',
    example: 'doe',
  })
  @IsString()
  @IsOptional()
  lastName?: string;
}
