import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Manager, Staff, User } from 'src/database/entities';
import {CustomerController} from "./customer.controller";
import {CustomerService} from "./customer.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Manager, Staff, Customer])
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [CustomerService],
})
export class SellReceiptModule {}