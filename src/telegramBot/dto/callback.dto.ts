import { ApiProperty } from '@nestjs/swagger';
import { IsPhoneNumber, IsString, IsNotEmpty } from 'class-validator';

export class СallbackDto {
  @IsPhoneNumber('UA', {
    message: 'Номер телефона некорректен',
  })
  @ApiProperty({
    description: 'Номер для звонка',
  })
  phone: string;

  @IsString({
    message: 'Имя пользователя не строка',
  })
  @IsNotEmpty({
    message: 'Имя пользователя пусто',
  })
  @ApiProperty({
    description: 'Наименования пользователя',
  })
  userName: string;
}
