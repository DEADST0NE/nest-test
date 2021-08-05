import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppCacheModule } from '../_config/cacheAndRedis';

@Module({
  controllers: [SmsController],
  providers: [SmsService],
  imports: [
    AppCacheModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        baseURL: process.env.SMS_URL,
      }),
    }),
  ],
})
export class SmsModule {}
