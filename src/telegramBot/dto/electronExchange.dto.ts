import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber, Matches } from 'class-validator';

export class ElectExchangeDto {
  @Matches(/([A-z]|_|[0-9]){5,}/gm, {
    message: 'Логин пользователя телеграм не валиден',
  })
  @IsNotEmpty()
  @ApiProperty({
    description: 'Логин пользователя в телеграм',
  })
  telegramName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Комментарий',
  })
  comment: string;

  @IsPhoneNumber('UA', {
    message: 'Номер телефона некорректен',
  })
  @ApiProperty({
    description: 'Номер для звонка',
  })
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Наименования пользователя',
  })
  userName: string;
}
