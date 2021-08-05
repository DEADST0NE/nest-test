import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TelegrafService } from '../_config/telegraf/telegraf.service';

import { OrderDto, userTypeEnum, transactionTypeEnum } from './dto/order.dto';
import { СallbackDto } from './dto/callback.dto';

import { random } from '../../utils/random';

@Injectable()
export class TelegramBotService {
  constructor(private readonly telegraf: TelegrafService) {}

  public async order(body: OrderDto) {
    try {
      const id = random(4, 'numeric');
      const userType = userTypeEnum[body.userType];
      const transactionType = transactionTypeEnum[body.transactionType];
      await this.telegraf.sendMessage(
        `<b>${body.city} (${userType})</b>:\n` +
          `<code>Номер заказа: ${id}\n` +
          `Отделение: ${body.branch}\n` +
          `Валюта: ${body.currency}\n` +
          `Тип операции: ${transactionType}\n` +
          `Курс: ${body.rate}\n` +
          `Сумма: ${body.sum}\n` +
          `Имя: ${body.userName}</code>\n` +
          `+${body.phone}`,
      );
      return 'Сообщения отправленно';
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async callback(body: СallbackDto) {
    try {
      await this.telegraf.sendMessage(
        `<b>Обратный звонок</b>:\n` +
          `<code>Имя: ${body.userName}\n` +
          `Комментарий: ${body.comment}</code>\n` +
          `+${body.phone}`,
      );
      return 'Сообщения отправленно';
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
