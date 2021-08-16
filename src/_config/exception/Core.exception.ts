import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

import { ErrorCode } from './Castom.exception';

type CustomExceptionType = {
  message: string;
  errorCode: ErrorCode;
  details?: any;
};

// Глобальный перехвадчик exception
@Catch(HttpException)
export class CoreExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = exception.getResponse() as CustomExceptionType;

    // Возвращаем ответ ошибки
    response.status(status).json({
      messages: error.message,
      errorCode: error.errorCode,
      details: error.details,
    });
  }
}
