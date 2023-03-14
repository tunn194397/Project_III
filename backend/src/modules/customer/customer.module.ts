import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Customer, Item, Manager, Staff, User, Warehouse, CustomerCart} from 'src/database/entities';
import {CustomerController} from "./customer.controller";
import {CustomerService} from "./customer.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Manager, Staff, Customer, CustomerCart, Item, Warehouse])
    ],
    controllers: [CustomerController],
    providers: [CustomerService],
    exports: [CustomerService],
})
export class CustomerModule {}