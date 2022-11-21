import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Manager, Staff, User } from 'src/database/entities';
import {ManagerController} from "./manager.controller";
import {ManagerService} from "./manager.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Manager, Staff, Customer])
    ],
    controllers: [ManagerController],
    providers: [ManagerService],
    exports: [ManagerService],
})
export class ManagerModule {}