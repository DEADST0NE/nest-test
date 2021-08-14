import { HttpException, HttpStatus } from '@nestjs/common';

export class TelegramException extends HttpException {
  constructor() {
    super(
      {
        message: 'Ошибка при отправки сообщение телеграм боту',
        statusCode: 1001,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
