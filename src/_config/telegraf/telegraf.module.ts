import { Module } from '@nestjs/common';

import { Telegraf } from 'telegraf';

import { AppCacheModule } from '../cacheAndRedis';
import { TelegrafService } from './telegraf.service';

@Module({
  imports: [Telegraf, AppCacheModule],
  providers: [TelegrafService],
  exports: [TelegrafService],
})
export class TelegrafModule {}
