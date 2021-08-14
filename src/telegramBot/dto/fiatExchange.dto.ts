import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export enum transactionTypeEnum {
  BUY,
  SELL,
}

export class FiatExchangeDto {
  @IsString()
  @ApiProperty({
    description: 'Город заявки',
  })
  city: string;

  @IsString()
  @ApiProperty({
    description: 'Отделение города',
  })
  department: string;

  @IsString()
  @ApiProperty({
    description: 'Тип валюты принимаем',
  })
  currencyFrom: string;

  @IsString()
  @ApiProperty({
    description: 'Тип валюты отдаем',
  })
  currencyTo: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Тип операции',
    enum: transactionTypeEnum,
  })
  transactionType: transactionTypeEnum;

  @IsString()
  @ApiProperty({
    description: 'Курс валюты',
  })
  rate: string;

  @IsString()
  @ApiProperty({
    description: 'Принимаем',
  })
  input: string;

  @IsString()
  @ApiProperty({
    description: 'Отдаем',
  })
  output: string;

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
