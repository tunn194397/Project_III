import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { databaseConfig } from './config/database.config';
import { TransformInterceptor } from './config/rest/transform.interceptor';
import { Connection } from 'typeorm';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ExceptionFilter } from './config/exception/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(databaseConfig),
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
