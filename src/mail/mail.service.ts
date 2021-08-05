import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { CreateEmployeeMailDto } from './dto/сreateEmployeeMail.dto';

import { random } from '../../utils/random';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async сreateEmployeeMail(body: CreateEmployeeMailDto) {
    try {
      await this.mailerService.sendMail({
        to: body.mail,
        subject: `Добро пожаловать в колектив ${process.env.COMPANY_NAME}`,
        template: __dirname + '/template/createEmployee',
        context: {
          login: random(8, 'lowerupper'),
          password: random(12, 'charalphanumeric'),
        },
      });
      return 'Письмо успешно отправленно';
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
