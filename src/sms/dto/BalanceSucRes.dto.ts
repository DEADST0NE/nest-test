import { ApiProperty } from '@nestjs/swagger';

export class BalanceSucRes {
  @ApiProperty()
  frozen: string;

  @ApiProperty()
  credit: string;

  @ApiProperty()
  balance: string;

  @ApiProperty()
  currency: string;
}
