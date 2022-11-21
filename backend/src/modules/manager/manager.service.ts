import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Customer, Manager, Staff, User} from "../../database/entities";
import {Repository} from "typeorm";

@Injectable()
export class ManagerService {
    constructor(
        @InjectRepository(Customer)
        private customerRepository: Repository<Customer>
    ) {}
}