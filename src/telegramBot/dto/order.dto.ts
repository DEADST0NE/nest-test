import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export enum transactionTypeEnum {
  BUY = 'Покупка',
  SELL = 'Продажа',
}

export enum userTypeEnum {
  WHOLESALE = 'опт.',
  RETAIL = 'Роз.',
}

export class OrderDto {
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

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Тип операции',
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
    description: 'Сумма',
  })
  sum: string;

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
  })
  userType: userTypeEnum;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Наименования пользователя',
  })
  userName: string;
}
