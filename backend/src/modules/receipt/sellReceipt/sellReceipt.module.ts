import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
    SellReceipt,
    SellItemReceipt,
    Item,
    User,
    Warehouse,
    Voucher,
    Customer,
    Staff,
    Manager
} from 'src/database/entities';
import {SellReceiptController} from "./sellReceipt.controller";
import {SellReceiptService} from "./sellReceipt.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([SellReceipt, SellItemReceipt, Item, User, Warehouse, Voucher, Customer, Staff, Manager])
    ],
    controllers: [SellReceiptController],
    providers: [SellReceiptService],
    exports: [SellReceiptService],
})
export class SellReceiptModule {}