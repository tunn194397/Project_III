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
import {ManagerModule} from "./modules/manager/manager.module";
import {CustomerModule} from "./modules/customer/customer.module";
import {StaffModule} from "./modules/staff/staff.module";
import {SupplyModule} from "./modules/supply/supply.module";
import {ImportReceiptModule} from "./modules/receipt/importReceipt/importReceipt.module";
import {WarehouseModule} from "./modules/warehouse/warehouse.module";
import {VoucherModule} from "./modules/voucher/voucher.module";
import {ItemModule} from "./modules/item/item.module";
import {SellReceiptModule} from "./modules/receipt/sellReceipt/sellReceipt.module";
import {DeviceModule} from "./modules/device/device.module";

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          load: [authConfig, appConfig],
          envFilePath: ['.env'],
      }),
      TypeOrmModule.forRoot(databaseConfig),
      UsersModule,
      AuthModule,
      ManagerModule,
      CustomerModule,
      StaffModule,
      SupplyModule,
      ItemModule,
      ImportReceiptModule,
      SellReceiptModule,
      WarehouseModule,
      DeviceModule,
      VoucherModule
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
