import { Module } from '@nestjs/common';

import AppController from 'src/app.controller';
import AppService from 'src/app.service';
import ConfigModule from 'src/config/config.module';
import ConfigService from 'src/config/config.service';
import KnexModule from 'src/modules/knex';

@Module({
  imports: [
    ConfigModule,
    KnexModule.registerAsync({
      useExisting: ConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export default class AppModule {}
