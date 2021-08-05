import { CodeController } from './code.controller';
import { CodeService } from './code.service';

import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [CodeController],
  providers: [CodeService],
})
export class CodeModule {}
