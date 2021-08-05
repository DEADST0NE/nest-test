import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Строка для хешировная в QR Code',
  })
  hex: string;
}
