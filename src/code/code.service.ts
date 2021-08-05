import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateDto } from './dto/create.dto';
import QRCode from 'qrcode';
import { TestDto } from './dto/test.dto';

@Injectable()
export class CodeService {
  public async create(params: CreateDto) {
    return QRCode.toDataURL(params.hex)
      .then((url) => {
        return url;
      })
      .catch((err) => {
        throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async test(body: TestDto) {
    return {
      input: body,
      output: 'Отлично он жив ))',
    };
  }
}
