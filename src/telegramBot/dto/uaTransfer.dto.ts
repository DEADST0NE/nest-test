import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsPhoneNumber } from 'class-validator';

export class UaTransferDto {
  @ApiProperty({
    description: 'Город откуда происходит перевод',
  })
  outputCity: string;

  @IsString()
  @ApiProperty({
    description: 'Город куда происходит перевод',
  })
  inputCity: string;

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
