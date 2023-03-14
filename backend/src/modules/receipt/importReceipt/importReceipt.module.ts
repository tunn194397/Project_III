import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ImportItemReceipt, ImportReceipt, Item, Supply, Warehouse} from 'src/database/entities';
import {ImportReceiptController} from "./importReceipt.controller";
import {ImportReceiptService} from "./importReceipt.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ImportReceipt, ImportItemReceipt, Item, Warehouse, Supply])
    ],
    controllers: [ImportReceiptController],
    providers: [ImportReceiptService],
    exports: [ImportReceiptService],
})
export class ImportReceiptModule {}