import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class TransToUaDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Город откуда происходит перевод',
  })
  outputCity: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Город куда происходит перевод',
  })
  inputCity: string;

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
