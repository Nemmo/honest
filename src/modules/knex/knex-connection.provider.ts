import { KNEX_CONNECTION } from './constants';
import KnexService from './knex.service';

const connectionFactory = {
  provide: KNEX_CONNECTION,
  useFactory: async knexService => {
    return knexService.getKnex();
  },
  inject: [KnexService],
};

export default connectionFactory;
