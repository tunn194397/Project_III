import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config'
import appConfig from './config/app.config';
import authConfig from './config/auth.config';
import { TransformInterceptor } from './config/rest/transform.interceptor';
import { Connection } from 'typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionFilter } from './config/exception/exception.filter';
import {UsersModule} from "./modules/user/users.module";
import {AuthModule} from "./modules/auth/auth.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          load: [authConfig, appConfig],
          envFilePath: ['.env'],
      }),
      TypeOrmModule.forRoot(databaseConfig),
      UsersModule,
      AuthModule
  ],
  controllers: [AppController],
  providers: [
      AppService,
      {
        provide: APP_INTERCEPTOR,
        useClass: TransformInterceptor,
      },
      {
        provide: APP_FILTER,
        useClass: ExceptionFilter,
      },
  ],
})
export class AppModule {
  constructor(private connection: Connection) { }
}
