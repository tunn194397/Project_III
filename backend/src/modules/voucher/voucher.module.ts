import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Customer, DeviceType, Item, Manager, Staff, User, Voucher, Warehouse} from 'src/database/entities';
import {VoucherController} from "./voucher.controller";
import {VoucherService} from "./voucher.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ Warehouse, Voucher, Item, DeviceType])
    ],
    controllers: [VoucherController],
    providers: [VoucherService],
    exports: [VoucherService],
})
export class VoucherModule {}