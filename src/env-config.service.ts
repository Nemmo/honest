import { Inject, Injectable } from '@nestjs/common';
import { ConfigType , registerAs } from '@nestjs/config';

import * as Joi from '@hapi/joi';

export const envConfig = registerAs('env', () => ({
  port: Number(process.env.PORT),
  hello: {
    greeting: process.env.GREETING,
    birthday: new Date(process.env.BIRTHDAY),
  },
}));

export const envConfigValidationSchema = Joi.object({
  GREETING: Joi.string()
    .empty('')
    .default('Hello World!'),
  PORT: Joi.number().default(3000),
  BIRTHDAY: Joi.date(),
});

@Injectable()
export class EnvConfigService {
  constructor(
    @Inject(envConfig.KEY)
    private readonly config,
  ) {}

  get get(): ConfigType<typeof envConfig> {
    return this.config;
  }
}
