import { Controller, Get } from '@nestjs/common';

import AppService from 'src/app.service';

@Controller()
export default class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/db')
  getNowFromDB(): Promise<string> {
    return this.appService.getNowFromDB();
  }
}
