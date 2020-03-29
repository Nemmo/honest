import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import {
  envConfig,
  EnvConfigService,
  envConfigValidationSchema,
} from './env-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfig],
      validationSchema: envConfigValidationSchema,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, EnvConfigService],
})
export class AppModule {}
