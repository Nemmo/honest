import { Module, Global } from '@nestjs/common';
import { ConfigModule as NestJSConfigModule } from '@nestjs/config';

import ConfigService, {
  appConfig,
  configValidationSchema,
} from 'src/config/config.service';

@Global()
@Module({
  imports: [
    NestJSConfigModule.forRoot({
      load: [appConfig],
      validationSchema: configValidationSchema,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export default class ConfigModule {}
