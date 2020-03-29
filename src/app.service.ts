import { Injectable } from '@nestjs/common';
import { EnvConfigService } from './env-config.service';

@Injectable()
export class AppService {
  constructor(private readonly envConfigService: EnvConfigService) {}

  getHello(): string {
    return `${
      this.envConfigService.get.hello.greeting
    } from ${this.envConfigService.get.hello.birthday.toString()}!`;
  }
}
