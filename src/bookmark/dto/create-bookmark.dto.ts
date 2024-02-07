import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDto {
  @ApiProperty({
    description: 'Title of the book',
    example: 'Women, work and the will to lead',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Description of the book',
    example: 'Women, work and the will to lead',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    description: 'Link of the book',
    example: 'https://www.amazon.com/Lean-Women-Work-Will-Lead/dp/0385349947',
  })
  @IsString()
  @IsNotEmpty()
  link: string;
}
