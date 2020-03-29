import { Injectable } from '@nestjs/common';
import { EnvConfigService } from 'src/env-config.service';

@Injectable()
export default class AppService {
  constructor(private readonly envConfigService: EnvConfigService) {}

  getHello(): string {
    return `${
      this.envConfigService.get.hello.greeting
    } from ${this.envConfigService.get.hello.birthday.toString()}!`;
  }
}
