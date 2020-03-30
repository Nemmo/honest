import { KNEX_OPTIONS } from './constants';
import { KnexOptions } from './interfaces';

export default function createKnexProviders(options: KnexOptions) {
  return [
    {
      provide: KNEX_OPTIONS,
      useValue: options,
    },
  ];
}
