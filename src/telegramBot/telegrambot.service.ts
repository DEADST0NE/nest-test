import { Injectable } from '@nestjs/common'; // HttpException, HttpStatus,

import { TelegrafService } from '../_config/telegraf/telegraf.service';

import { FiatExchangeDto, transactionTypeEnum } from './dto/fiatExchange.dto';
import { СallbackDto } from './dto/callback.dto';
import { UaTransferDto } from './dto/uaTransfer.dto';
import { InternationalTransferDto } from './dto/internationalTransfer.dto';
import { CryptoExchangeDto } from './dto/electronExchange.dto';

import { TelegramException } from './exception/telegram.exception';

@Injectable()
export class TelegramBotService {
  constructor(private readonly telegraf: TelegrafService) {}

  // Заявка обмен валюты
  public async fiatExchange(body: FiatExchangeDto) {
    try {
      const id = await this.telegraf.getApplicationID();

      const textTransactionTypeEnum = (a: string, b: string) =>
        body.transactionType === transactionTypeEnum.BUY ? a : b;

      const userType = 'Нужно посоветоваться с Ильей';

      await this.telegraf.sendMessage(
        'order',
        `<b>${body.city} (${userType})</b>:\n` +
          `<code>Вид деятельности: Обмен валют\n` +
          `Номер заказа: ${id}\n` +
          `Отделение: ${body.department}\n` +
          `Валюта: ${body.currencyFrom}/${body.currencyTo}\n` +
          `Тип операции: ${textTransactionTypeEnum('Покупка', 'Продажа')}\n` +
          `Курс: ${body.rate}\n` +
          `${textTransactionTypeEnum('Покупают', 'Продаем')}: ${body.input}\n` +
          `${textTransactionTypeEnum('Отдают', 'Получаем')}: ${body.output}\n` +
          `Имя: ${body.userName || 'Не указано'}</code>\n` +
          `+${body.phone}`,
      );
      return {
        success: true,
      };
    } catch (err) {
      throw new TelegramException();
    }
  }

  // Обратный звонок
  public async callback(body: СallbackDto) {
    try {
      await this.telegraf.sendMessage(
        'callback',
        `<b>Обратный звонок</b>:\n` +
          `<code>Имя: ${body.userName || 'Не указано'}\n` +
          `Комментарий: ${body.comment || ''}</code>\n` +
          `+${body.phone}`,
      );
      return {
        success: true,
      };
    } catch (err) {
      throw new TelegramException();
    }
  }

  // Заявка Денежные переводы по Украине
  public async uaTransfer(body: UaTransferDto) {
    try {
      await this.telegraf.sendMessage(
        'order',
        `<b>Переводы по Украине</b>:\n` +
          `<code>Имя: ${body.userName || 'Не указано'}\n` +
          `Откуда: ${body.outputCity}\n` +
          `Куда: ${body.inputCity}\n` +
          `Комментарий: ${body.comment || ''}</code>\n` +
          `+${body.phone}`,
      );
      return {
        success: true,
      };
    } catch (err) {
      throw new TelegramException();
    }
  }

  // Заявка Международные переводы
  public async internationalTransfer(body: InternationalTransferDto) {
    try {
      await this.telegraf.sendMessage(
        'order',
        `<b>Международные переводы</b>:\n` +
          `<code>Имя: ${body.userName || 'Не указано'}\n` +
          `Комментарий: ${body.comment || ''}</code>\n` +
          `+${body.phone}`,
      );
      return {
        success: true,
      };
    } catch (err) {
      throw new TelegramException();
    }
  }

  // Заявка обмен электронных валют
  public async cryptoExchange(body: CryptoExchangeDto) {
    try {
      await this.telegraf.sendMessage(
        'order',
        `<b>Обмен электронных валют</b>:\n` +
          `<code>Имя: ${body.userName || 'Не указано'}\n` +
          `Комментарий: ${body.comment || ''}</code>\n` +
          `+${body.phone}\n` +
          `@${body.telegramName}`,
      );
      return {
        success: true,
      };
    } catch (err) {
      throw new TelegramException();
    }
  }
}
