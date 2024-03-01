import { ApiProperty } from '@nestjs/swagger';
import { CreateBookmarkDto } from './create-bookmark.dto';

export class BookmarkResponse extends CreateBookmarkDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: new Date() })
  createdAt: Date;

  @ApiProperty({ example: new Date() })
  updatedAt: Date;

  @ApiProperty({ example: 1 })
  userId: number;
}
