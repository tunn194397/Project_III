import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Customer, DeviceType, Manager, Staff, User, Item, Warehouse} from 'src/database/entities';
import {WarehouseController} from "./warehouse.controller";
import {WarehouseService} from "./warehouse.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Warehouse, Item, DeviceType])
    ],
    controllers: [WarehouseController],
    providers: [WarehouseService],
    exports: [WarehouseService],
})
export class WarehouseModule {}