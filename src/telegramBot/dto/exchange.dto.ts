import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export enum transactionTypeEnum {
  BUY,
  SELL,
}

export enum userTypeEnum {
  WHOLESALE,
  RETAIL,
}

export class ExchangeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Город заявки',
  })
  city: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Отделение города',
  })
  branch: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Тип валюты',
  })
  currency: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Тип операции',
    enum: transactionTypeEnum,
  })
  transactionType: transactionTypeEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Курс валюты',
  })
  rate: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'Принимаем',
  })
  input: string;

  @IsNotEmpty()
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

  @IsNotEmpty()
  @ApiProperty({
    description: 'Тип пользователя',
    enum: userTypeEnum,
  })
  userType: userTypeEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Наименования пользователя',
  })
  userName: string;
}
