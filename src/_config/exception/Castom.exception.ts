import { HttpException, HttpStatus } from '@nestjs/common';

export enum ErrorCode {
  NotConfirmed = 10, // 'Пользователь не верифицировал электронную почту.'
  NextError = 20,
  DataValidateError = 1000, // 'Ошибка валидации данных'
  TelegramError = 1001, // 'Ошибка отправки данных Telegram бота'
}

// Список кастомных 'Exception'

export class TelegramException extends HttpException {
  constructor() {
    super(
      {
        message: 'Ошибка при отправки сообщение телеграм боту',
        errorCode: ErrorCode.TelegramError,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

export class DataValidateException extends HttpException {
  constructor(error?: any) {
    super(
      {
        message: 'Ошибка валидации',
        errorCode: ErrorCode.DataValidateError,
        details: error,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}

// ---------------------------
