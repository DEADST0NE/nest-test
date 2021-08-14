import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class СallbackDto {
  @IsPhoneNumber('UA', {
    message: 'Номер телефона некорректен',
  })
  @ApiProperty({
    description: 'Номер для звонка',
  })
  phone: string;

  @ApiProperty({
    description: 'Наименования пользователя',
    required: false,
  })
  userName?: string;

  @ApiProperty({
    description: 'Комментарий',
    required: false,
  })
  comment?: string;
}
