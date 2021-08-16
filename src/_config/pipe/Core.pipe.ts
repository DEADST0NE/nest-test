/* eslint-disable @typescript-eslint/ban-types */
import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

import { DataValidateException } from '../exception/Castom.exception';

// Глобальный pipe валидации
@Injectable()
export class CorePipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      // Приводим исключения валидации в более удобный вид
      const errorList = errors.map((eI) => ({
        field: eI.property,
        error: Object.keys(eI.constraints).map((key) => eI.constraints[key]),
      }));
      throw new DataValidateException(errorList);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
