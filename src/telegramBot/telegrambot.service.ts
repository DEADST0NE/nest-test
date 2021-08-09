import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { TelegrafService } from '../_config/telegraf/telegraf.service';

import {
  ExchangeDto,
  transactionTypeEnum,
  userTypeEnum,
} from './dto/exchange.dto';
import { СallbackDto } from './dto/callback.dto';
import { TransToUaDto } from './dto/transToUa.dto';
import { TransToWorld } from './dto/transToWorld.dto';

@Injectable()
export class TelegramBotService {
  constructor(private readonly telegraf: TelegrafService) {}

  // Заявка обмен валюты
  public async exchange(body: ExchangeDto) {
    try {
      const id = await this.telegraf.getApplicationID();

      const textInput =
        body.transactionType === transactionTypeEnum.BUY
          ? 'Покупают'
          : 'Продаем';

      const textOutput =
        body.transactionType === transactionTypeEnum.BUY
          ? 'Отдают'
          : 'Получаем';

      const userType =
        body.userType === userTypeEnum.WHOLESALE ? 'опт.' : 'роз.';

      await this.telegraf.sendMessage(
        'order',
        `<b>${body.city} (${userType})</b>:\n` +
          `<code>Вид деятельности: Обмен валют\n` +
          `Номер заказа: ${id}\n` +
          `Отделение: ${body.branch}\n` +
          `Валюта: ${body.currency}\n` +
          `Тип операции: ${body.transactionType}\n` +
          `Курс: ${body.rate}\n` +
          `${textInput}: ${body.input}\n` +
          `${textOutput}: ${body.output}\n` +
          `Имя: ${body.userName}</code>\n` +
          `+${body.phone}`,
      );
      return 'Сообщения отправленно';
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Обратный звонок
  public async callback(body: СallbackDto) {
    try {
      await this.telegraf.sendMessage(
        'callback',
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

  // Заявка Денежные переводы по Украине
  public async transToUa(body: TransToUaDto) {
    try {
      await this.telegraf.sendMessage(
        'order',
        `<b>Переводы по Украине</b>:\n` +
          `<code>Имя: ${body.userName}\n` +
          `Откуда: ${body.outputCity}\n` +
          `Куда: ${body.inputCity}\n` +
          `Комментарий: ${body.comment}</code>\n` +
          `+${body.phone}`,
      );
      return 'Сообщения отправленно';
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // Заявка Международные переводы
  public async transToWorld(body: TransToWorld) {
    try {
      await this.telegraf.sendMessage(
        'order',
        `<b>Международные переводы</b>:\n` +
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
