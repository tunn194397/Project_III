import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Branch, Customer, Manager, Staff, User} from 'src/database/entities';
import {StaffController} from "./staff.controller";
import {StaffService} from "./staff.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Manager, Staff, Customer, Branch])
    ],
    controllers: [StaffController],
    providers: [StaffService],
    exports: [StaffService],
})
export class StaffModule {}