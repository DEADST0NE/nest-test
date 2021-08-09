import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        // SMS service
        SMS_URL: Joi.string().required(),
        SMS_INTEL_APT_KEY: Joi.string().required(),
        SMS_INTEL_USER_NAME: Joi.string().required(),
        // Email service
        EMAIL_ID: Joi.string().required(),
        EMAIL_PASS: Joi.string().required(),
        EMAIL_HOST: Joi.string().required(),
        EMAIL_FROM: Joi.string().required(),
        COMPANY_NAME: Joi.string().required(),
        // Redis server
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
        REDIS_PASS: Joi.string().required(),
        // Telegram bot
        TELEGRAM_BOT_TOKEN: Joi.string().required(),
        // Post start application
        PORT: Joi.string().required(),
      }),
    }),
  ],
  exports: [ConfigModule],
})
export class AppViriablesModule {}
