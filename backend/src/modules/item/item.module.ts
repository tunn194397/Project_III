import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    DeviceParameter,
    DeviceType,
    ImportReceipt,
    Item,
    ItemParameter,
    SellReceipt,
    Supply, Voucher, Warehouse
} from 'src/database/entities';
import {ItemController} from "./item.controller";
import {ItemService} from "./item.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([Item, ItemParameter, DeviceType, Supply, DeviceParameter, SellReceipt, ImportReceipt, Voucher, Warehouse])
    ],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule {}