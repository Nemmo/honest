import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { KnexOptionsFactory } from './knex-options-factory.interface';
import { KnexOptions } from './knex-options.interface';

export interface KnexAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useExisting?: Type<KnexOptionsFactory>;
  useClass?: Type<KnexOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<KnexOptions> | KnexOptions;
}
