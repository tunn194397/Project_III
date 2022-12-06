import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, DeviceParameter, DeviceType, Manager, Staff, User} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {FindUserDto} from "../../shared/request/findUser.dto";

@Injectable()
export class DeviceService {
    constructor(
        @InjectRepository(DeviceType)
        private deviceTypeRepository: Repository<DeviceType>,

        @InjectRepository(DeviceParameter)
        private deviceParameterRepository: Repository<DeviceParameter>
    ) {}


    async getAllDeviceType() {
        return await this.deviceTypeRepository.find()
    }

    async getAllDeviceMainType() {
        return await this.deviceTypeRepository.find(
            {where: {parentId: 0}}
        );
    }

    async getAllDeviceChildrenType(parentId: number) {
        return await this.deviceTypeRepository.find({
            where: {parentId: parentId}
        })
    }

    async getDeviceTypeDetail(id: number) {
        return await this.deviceTypeRepository.findOne(id)
    }

    async createNewDeviceType(name: string, parentId: number) {
        const newDeviceType = this.deviceTypeRepository.create({name: name, parentId: parentId})
        return await this.deviceTypeRepository.save(newDeviceType);
    }

    async updateDeviceType(id: number, newName: string, newParentId: number) {
        return await this.deviceTypeRepository.update(id, {
            name: newName,
            parentId: newParentId
        })
    }

}