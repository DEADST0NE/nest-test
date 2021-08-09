import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { TelegrambotPipe } from './pipe/telegrambot.pipe';

import { ExchangeDto } from './dto/exchange.dto';
import { СallbackDto } from './dto/callback.dto';
import { TransToUaDto } from './dto/transToUa.dto';
import { TransToWorld } from './dto/transToWorld.dto';

import { TelegramBotService } from './telegrambot.service';

@ApiTags('bot')
@Controller('bot')
@Controller()
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  @Post('/exchange')
  @ApiResponse({
    status: 201,
    type: String,
  })
  @ApiOperation({
    summary: 'Отправка сообщения заявка на обмен валюты',
  })
  @ApiBody({ type: ExchangeDto })
  async order(@Body(TelegrambotPipe) body: ExchangeDto): Promise<any> {
    return this.telegramBotService.exchange(body);
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
  async callback(@Body(TelegrambotPipe) body: СallbackDto): Promise<any> {
    return this.telegramBotService.callback(body);
  }

  @Post('/transToUa')
  @ApiResponse({
    status: 201,
    type: String,
  })
  @ApiOperation({
    summary: 'Отправка сообщения заявка на переводы по Украине',
  })
  @ApiBody({ type: TransToUaDto })
  async transToUa(@Body(TelegrambotPipe) body: TransToUaDto): Promise<any> {
    return this.telegramBotService.transToUa(body);
  }

  @Post('/transToWorld')
  @ApiResponse({
    status: 201,
    type: String,
  })
  @ApiOperation({
    summary: 'Отправка сообщения заявка на международные переводы',
  })
  @ApiBody({ type: TransToWorld })
  async transToWorld(@Body(TelegrambotPipe) body: TransToWorld): Promise<any> {
    return this.telegramBotService.transToWorld(body);
  }
}
