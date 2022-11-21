import {CustomerService} from "./customer.service";

export class CustomerController {
    constructor(private readonly customerService: CustomerService) {}
}