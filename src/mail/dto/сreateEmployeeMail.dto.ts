import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateEmployeeMailDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Email сотрудника',
  })
  mail: string;
}
