import {ManagerService} from "./manager.service";

export class ManagerController {
    constructor(private readonly customerService: ManagerService) {}
}