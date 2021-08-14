import { ApiProperty } from '@nestjs/swagger';

export class ResponseBotDto {
  @ApiProperty({
    description: 'Статус ответа',
  })
  success: boolean;
}
