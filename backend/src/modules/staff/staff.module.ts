import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer, Manager, Staff, User } from 'src/database/entities';
import {StaffController} from "./staff.controller";
import {StaffService} from "./staff.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Manager, Staff, Customer])
    ],
    controllers: [StaffController],
    providers: [StaffService],
    exports: [StaffService],
})
export class StaffModule {}