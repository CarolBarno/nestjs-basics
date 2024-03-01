import { ApiProperty } from '@nestjs/swagger';

export class UserResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;

  @ApiProperty({ example: 'janedoe@gmail.com' })
  email: string;

  @ApiProperty({ example: 'hashed' })
  hash: string;

  @ApiProperty({ example: 'Jane' })
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  lastName: string;
}
