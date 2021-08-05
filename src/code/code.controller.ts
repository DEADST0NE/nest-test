import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import { CodeService } from './code.service';
import { TestDto } from './dto/test.dto';

@ApiTags('code')
@Controller('code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Get('/create')
  @ApiResponse({
    status: 200,
    type: String,
  })
  @ApiOperation({
    summary: 'Создать QR Code',
  })
  async create(@Query() params: CreateDto): Promise<any> {
    return this.codeService.create(params);
  }

  @Post('/test')
  @ApiOperation({
    summary: 'Запрос для тестирование QRCode',
  })
  async test(@Body() body: TestDto): Promise<any> {
    return this.codeService.test(body);
  }
}
