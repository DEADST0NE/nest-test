import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsString({
    message: 'Текст сообщения не строка',
  })
  @IsNotEmpty({
    message: 'Текст сообщения пуст',
  })
  @ApiProperty({
    description: 'Текст сообщения для отправки',
  })
  message: string;
}
