import { Injectable, OnModuleInit } from '@nestjs/common';

import { Telegraf } from 'telegraf';

@Injectable()
export class TelegrafService implements OnModuleInit {
  private bt: Telegraf;
  onModuleInit() {
    this.bt = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);
  }

  public sendMessage(text: string) {
    return this.bt.telegram.sendMessage(process.env.TELEGRAM_CHAT_ORDER, text, {
      parse_mode: 'HTML',
    });
  }
}
