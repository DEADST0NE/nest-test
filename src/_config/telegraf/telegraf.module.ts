import { TelegrafService } from './telegraf.service';

import { Telegraf } from 'telegraf';

import { Module } from '@nestjs/common';

@Module({
  imports: [Telegraf],
  providers: [TelegrafService],
  exports: [TelegrafService],
})
export class TelegrafModule {}
