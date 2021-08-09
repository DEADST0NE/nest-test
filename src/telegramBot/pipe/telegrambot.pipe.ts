import { PipeTransform, Injectable } from '@nestjs/common';

import { ExchangeDto } from '../dto/exchange.dto';
import { СallbackDto } from '../dto/callback.dto';

import { shielding } from '../../../utils/shielding';

type valueType = ExchangeDto | СallbackDto;

@Injectable()
export class TelegrambotPipe implements PipeTransform {
  transform(value: valueType) {
    const responseValue: valueType | unknown = {};

    try {
      Object.keys(value).forEach((key) => {
        responseValue[key] = shielding(value[key]);
      });
      return responseValue;
    } catch {
      return value;
    }
  }
}
