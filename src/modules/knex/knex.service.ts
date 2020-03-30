import { Injectable, Inject, Logger } from '@nestjs/common';
import Knex from 'knex';

import { KNEX_OPTIONS } from './constants';
import { KnexOptions } from './interfaces';

@Injectable()
export default class KnexService {
  private readonly logger: Logger;

  private knexConnection: Knex;

  constructor(@Inject(KNEX_OPTIONS) private knexOptions: KnexOptions) {
    this.logger = new Logger('KnexService');
    this.logger.log(`Options: ${JSON.stringify(this.knexOptions)}`);
  }

  getKnex() {
    if (!this.knexConnection) {
      this.knexConnection = Knex(this.knexOptions);
    }
    return this.knexConnection;
  }
}
