import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class TransToWorld {
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
