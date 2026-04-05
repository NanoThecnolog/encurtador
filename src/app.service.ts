import { Injectable } from '@nestjs/common';
import { ResponseUtil } from './common/utils/response.util';
import { APISuccessResponse } from './common/interfaces/api-response.interface';

@Injectable()
export class AppService {
  getHello(): APISuccessResponse {
    return ResponseUtil.success({ status: 'online' });
  }

}
