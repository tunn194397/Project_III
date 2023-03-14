import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Customer, Manager, Staff, Supply, User} from 'src/database/entities';
import {SupplyController} from "./supply.controller";
import {SupplyService} from "./supply.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Manager, Staff, Customer, Supply])
    ],
    controllers: [SupplyController],
    providers: [SupplyService],
    exports: [SupplyService],
})
export class SupplyModule {}