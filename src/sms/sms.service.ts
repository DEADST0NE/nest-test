import {
  CACHE_MANAGER,
  Inject,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Cache } from 'cache-manager';
import moment from 'moment';

import { SendCodeDto } from './dto/sendCode.dto';

import random from 'utils/random';

@Injectable()
export class SmsService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private httpService: HttpService,
  ) {}

  public async sendCode(body: SendCodeDto) {
    const smsCode: string =
      (await this.cacheManager.get(body.phone)) || random(4, 'numeric');
    await this.cacheManager.set(body.phone, smsCode);
    const dataCreate = moment().format('hh:mm DD.MM.YY');

    return this.httpService.axiosRef
      .get('/message/send', {
        params: {
          username: process.env.SMS_INTEL_USER_NAME,
          api_key: process.env.SMS_INTEL_APT_KEY,
          from: 'OneTeam', // process.env.SMS_INTEL_USER_NAME
          to: body.phone,
          message: `Никому не говорите код ${smsCode}! Вход в In Team ${dataCreate}`,
        },
      })
      .then(() => {
        return 'Сообщение успешно отправленно';
      })
      .catch(() => {
        throw new HttpException(status, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async balance() {
    return this.httpService.axiosRef
      .get('/balance', {
        params: {
          username: process.env.SMS_INTEL_USER_NAME,
          api_key: process.env.SMS_INTEL_APT_KEY,
        },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        throw new HttpException(
          {
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            error: err.response.data.message,
          },
          err.response.status,
        );
      });
  }
}
