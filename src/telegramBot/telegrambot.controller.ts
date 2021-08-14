import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

// Input Data
import { FiatExchangeDto } from './dto/fiatExchange.dto';
import { СallbackDto } from './dto/callback.dto';
import { UaTransferDto } from './dto/uaTransfer.dto';
import { InternationalTransferDto } from './dto/internationalTransfer.dto';
import { CryptoExchangeDto } from './dto/electronExchange.dto';

// Pipe
import { ValidationBotPipe } from './pipe/validationBot.pipe';

// Output Data
import { ResponseBotDto } from './dto/responseBot.dto';

import { TelegramBotService } from './telegrambot.service';

@ApiTags('bot')
@Controller('bot')
export class TelegramBotController {
  constructor(private readonly telegramBotService: TelegramBotService) {}

  @Post('/fiat-exchange')
  @ApiResponse({
    status: 201,
    type: ResponseBotDto,
  })
  @ApiOperation({
    summary: 'Отправка сообщения заявка на обмен валюты',
  })
  @ApiBody({ type: FiatExchangeDto })
  async order(@Body(new ValidationBotPipe()) body: FiatExchangeDto) {
    return this.telegramBotService.fiatExchange(body);
  }

  @Post('/callback')
  @ApiResponse({
    status: 201,
    type: ResponseBotDto,
  })
  @ApiOperation({
    summary: 'Отправка сообщения в чат "Обратный звонок"',
  })
  @ApiBody({ type: СallbackDto })
  async callback(@Body(new ValidationBotPipe()) body: СallbackDto) {
    return this.telegramBotService.callback(body);
  }

  @Post('/ua-transfer')
  @ApiResponse({
    status: 201,
    type: ResponseBotDto,
  })
  @ApiOperation({
    summary: 'Отправка сообщения заявка на переводы по Украине',
  })
  @ApiBody({ type: UaTransferDto })
  async uaTransfer(@Body(new ValidationBotPipe()) body: UaTransferDto) {
    return this.telegramBotService.uaTransfer(body);
  }

  @Post('/international-transfer')
  @ApiResponse({
    status: 201,
    type: ResponseBotDto,
  })
  @ApiOperation({
    summary: 'Отправка сообщения заявка на международные переводы',
  })
  @ApiBody({ type: InternationalTransferDto })
  async internationalTransfer(
    @Body(new ValidationBotPipe()) body: InternationalTransferDto,
  ) {
    return this.telegramBotService.internationalTransfer(body);
  }

  @Post('/crypto-exchange')
  @ApiResponse({
    status: 201,
    type: ResponseBotDto,
  })
  @ApiOperation({
    summary: 'Отправка сообщения заявка на обмен электронных валют',
  })
  @ApiBody({ type: CryptoExchangeDto })
  async cryptoExchange(@Body(new ValidationBotPipe()) body: CryptoExchangeDto) {
    return this.telegramBotService.cryptoExchange(body);
  }
}
