import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { Telegraf } from 'telegraf';

type groupType = 'order' | 'callback';

@Injectable()
export class TelegrafService {
  private bt: Telegraf;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    // Инициализация модуля telegraf
    this.bt = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  }

  // Получить id чата
  private getChatsID = (groupType: groupType) => {
    switch (groupType) {
      case 'order':
        return process.env.TELEGRAM_CHAT_ORDER;
      case 'callback':
        return process.env.TELEGRAM_CHAT_CALLBACK;
    }
  };

  // Получить новый Id заявки и сохранить ее в redis
  public async getApplicationID() {
    const _nameID = 'telegramApplicationID';
    let id: string = (await this.cacheManager.get(_nameID)) || '0';
    if (id === '999999') id = '0';
    id = (+id + 1).toString().padStart(6, '0');
    await this.cacheManager.set(_nameID, id, { ttl: 0 });
    return id;
  }

  // Отправить сообщение в определенную группу
  public sendMessage(groupType: groupType, text: string) {
    return this.bt.telegram.sendMessage(this.getChatsID(groupType), text, {
      parse_mode: 'HTML',
    });
  }
}
