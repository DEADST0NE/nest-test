import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber } from 'class-validator';

export class InternationalTransferDto {
  @ApiProperty({
    description: 'Комментарий',
    required: false,
  })
  comment?: string;

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
}
