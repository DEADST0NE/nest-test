import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiBody, ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

import { SmsService } from './sms.service';

import { SendCodeDto } from './dto/sendCode.dto';
import { BalanceSucRes } from './dto/BalanceSucRes.dto';

@ApiTags('sms')
@Controller('sms')
export class SmsController {
  constructor(private readonly userService: SmsService) {}

  @Post('/sendCode')
  @ApiResponse({
    status: 201,
    type: String,
  })
  @ApiOperation({
    summary: 'Отправка сообщение с кодом на телефон',
  })
  @ApiBody({ type: SendCodeDto })
  async send(@Body() body: SendCodeDto): Promise<any> {
    return this.userService.sendCode(body);
  }

  @Get('/balance')
  @ApiResponse({
    status: 200,
    type: BalanceSucRes,
  })
  @ApiOperation({
    summary: 'Проверка баланса',
  })
  async balance(): Promise<any> {
    return this.userService.balance();
  }
}
