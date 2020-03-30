import { Inject, Injectable } from '@nestjs/common';

import ConfigService from 'src/config/config.service';
import { KNEX_CONNECTION } from 'src/knex';

@Injectable()
export default class AppService {
  constructor(
    private readonly configService: ConfigService,
    @Inject(KNEX_CONNECTION) private readonly knex,
  ) {}

  getHello(): string {
    return `${this.configService.get.hello.greeting}!`;
  }

  async getNowFromDB(): Promise<string> {
    const { rows } = await this.knex.raw('SELECT now();');

    return rows[0].now;
  }
}
