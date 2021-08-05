import { TelegramBotModule } from './telegramBot/telegrambot.module';
import { MailModule } from './mail/mail.module';
import { CodeModule } from './code/code.module';
import { SmsModule } from './sms/sms.module';
import { Module } from '@nestjs/common';

import { AppCacheModule } from './_config/cacheAndRedis';
import { AppViriablesModule } from './_config/variables';

@Module({
  imports: [
    TelegramBotModule,
    AppViriablesModule,
    AppCacheModule,
    MailModule,
    CodeModule,
    SmsModule,
  ],
})
export class AppModule {}
