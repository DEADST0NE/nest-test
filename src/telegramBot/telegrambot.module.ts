import { Module } from '@nestjs/common';

import { TelegrafModule } from '../_config/telegraf/telegraf.module';

import { TelegramBotController } from './telegrambot.controller';
import { TelegramBotService } from './telegrambot.service';

@Module({
  imports: [TelegrafModule],
  controllers: [TelegramBotController],
  providers: [TelegramBotService],
})
export class TelegramBotModule {}
