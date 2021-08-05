import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { OrderDto } from './dto/order.dto';
import { СallbackDto } from './dto/callback.dto';

import { TelegramBotService } from './telegrambot.service';

@ApiTags('bot')
@Controller('bot')
@Controller()
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  @Post('/order')
  @ApiResponse({
    status: 201,
    type: String,
  })
  @ApiOperation({
    summary: 'Отправка сообщения в чат "Заявки"',
  })
  @ApiBody({ type: OrderDto })
  async order(@Body() body: OrderDto): Promise<any> {
    return this.telegramBotService.order(body);
  }

  @Post('/callback')
  @ApiResponse({
    status: 201,
    type: String,
  })
  @ApiOperation({
    summary: 'Отправка сообщения в чат "Обратный звонок"',
  })
  @ApiBody({ type: СallbackDto })
  async callback(@Body() body: СallbackDto): Promise<any> {
    return this.telegramBotService.callback(body);
  }
}
