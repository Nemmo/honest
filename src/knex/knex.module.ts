import { Module, DynamicModule, Provider, Global } from '@nestjs/common';

import { KNEX_OPTIONS } from './constants';
import {
  KnexOptions,
  KnexAsyncOptions,
  KnexOptionsFactory,
} from './interfaces';
import connectionFactory from './knex-connection.provider';
import createKnexProviders from './knex.providers';
import KnexService from './knex.service';

@Global()
@Module({
  providers: [KnexService, connectionFactory],
  exports: [KnexService, connectionFactory],
})
export default class KnexModule {
  /**
   * Registers a configured NestKnex Module for import into the current module
   */
  public static register(options: KnexOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: createKnexProviders(options),
    };
  }

  /**
   * Registers a configured NestKnex Module for import into the current module
   * using dynamic options (factory, etc)
   */
  public static registerAsync(options: KnexAsyncOptions): DynamicModule {
    return {
      module: KnexModule,
      providers: [...this.createProviders(options)],
    };
  }

  private static createProviders(options: KnexAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createOptionsProvider(options)];
    }

    return [
      this.createOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createOptionsProvider(options: KnexAsyncOptions): Provider {
    if (options.useFactory) {
      return {
        provide: KNEX_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }

    // For useExisting...
    return {
      provide: KNEX_OPTIONS,
      useFactory: async (optionsFactory: KnexOptionsFactory) =>
        optionsFactory.createKnexOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }
}
