import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TelegrafService } from '../_config/telegraf/telegraf.service';

import { OrderDto } from './dto/order.dto';
import { СallbackDto } from './dto/callback.dto';

@Injectable()
export class TelegramBotService {
  constructor(private readonly telegraf: TelegrafService) {}

  public async order(body: OrderDto) {
    try {
      await this.telegraf.sendMessage(body.message);
      return 'Сообщения отправленно';
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async callback(body: СallbackDto) {
    try {
      await this.telegraf.sendMessage(
        `Заявка на обратный звонок\nИмя:  _${body.userName}_\nТелефон:  _\\+${body.phone}_`,
      );
      return 'Сообщения отправленно';
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
