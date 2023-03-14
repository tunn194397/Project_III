import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {Customer, DeviceParameter, DeviceType, Manager, Staff, User} from 'src/database/entities';
import {DeviceController} from "./device.controller";
import {DeviceService} from "./device.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([DeviceType, DeviceParameter])
    ],
    controllers: [DeviceController],
    providers: [DeviceService],
    exports: [DeviceService],
})
export class DeviceModule {}