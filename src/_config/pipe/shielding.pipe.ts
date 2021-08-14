import { PipeTransform, Injectable } from '@nestjs/common';

import { shielding } from '../../../utils/shielding';

@Injectable()
export class ShieldingPipe implements PipeTransform {
  transform(value) {
    const responseValue: unknown = {};
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
