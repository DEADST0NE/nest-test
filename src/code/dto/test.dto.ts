import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class TestDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'id пользователя',
  })
  id: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Имя пользователя',
  })
  name: string;
}
