import {ItemService} from "./item.service";

export class ItemController {
    constructor(private readonly customerService: ItemService) {}
}