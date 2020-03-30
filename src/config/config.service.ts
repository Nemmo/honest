import Joi from '@hapi/joi';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';

import { KnexOptions, KnexOptionsFactory } from 'src/knex';

export const appConfig = registerAs('app', () => ({
  port: Number(process.env.PORT),
  hello: {
    greeting: process.env.GREETING,
  },
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
  },
}));

export const configValidationSchema = Joi.object({
  GREETING: Joi.string()
    .empty('')
    .default('Hello World'),
  PORT: Joi.number().default(3000),
  DB_HOST: Joi.string()
    .empty('')
    .default('localhost'),
  DB_USER: Joi.string()
    .empty('')
    .default('postgres'),
  DB_PASSWORD: Joi.string()
    .empty('')
    .default('postgres'),
  DB_DATABASE: Joi.string()
    .empty('')
    .default('postgres'),
  DB_PORT: Joi.number().default(5432),
});

@Injectable()
export default class ConfigService implements KnexOptionsFactory {
  constructor(
    @Inject(appConfig.KEY)
    private readonly config,
  ) {}

  get get(): ConfigType<typeof appConfig> {
    return this.config;
  }

  createKnexOptions(): Promise<KnexOptions> | KnexOptions {
    return {
      client: 'pg',
      connection: {
        host: this.config.db.host,
        user: this.config.db.user,
        password: this.config.db.password,
        database: this.config.db.database,
        port: this.config.db.port,
      },
      // debug: true,
    };
  }
}
