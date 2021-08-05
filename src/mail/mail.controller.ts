import { Controller, Post, Body } from '@nestjs/common';

import { MailService } from './mail.service';

import { CreateEmployeeMailDto } from './dto/сreateEmployeeMail.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('/createEmployee')
  @ApiResponse({
    status: 201,
    type: String,
  })
  @ApiOperation({
    summary: 'Отправка письма приглашения сотруднику',
  })
  sendMail(@Body() body: CreateEmployeeMailDto): Promise<any> {
    return this.mailService.сreateEmployeeMail(body);
  }
}
