import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Manager, Staff, User } from 'src/database/entities';
import {ItemController} from "./item.controller";
import {ItemService} from "./item.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Manager, Staff, Customer])
    ],
    controllers: [ItemController],
    providers: [ItemService],
    exports: [ItemService],
})
export class ItemModule {}