import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { APISuccessResponse } from './common/interfaces/api-response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): APISuccessResponse {
    return this.appService.getHello();
  }
}
