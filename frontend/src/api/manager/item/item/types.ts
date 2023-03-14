export interface IGetListItem  {
    page: number | undefined,
    pageSize: number | undefined,
    minPrice: number | null | undefined,
    maxPrice: number | null | undefined,
    supplyId: number | null | undefined,
    deviceType: number | null | undefined,
    branch: string | null | undefined,
    searchString: string | undefined,
    orderField: string | undefined,
    orderBy: string | undefined
}

interface IItem {
    name: string,
    deviceTypeId: string,
    price: string,
    content: string,
    image: string,
    introduce: string,
    branch: string,
    productionTime: number,
    productionCode: string,
    supplyId: number
}
interface IItemParameter {
    deviceParameterId: number,
    value: any,
    detail: any
}

export interface ICreateItem {
    item: IItem,
    itemParameters: IItemParameter[]
}

interface IUpdateItem {
    name: string;
    type: string;
    price: number;
    content: string;
    image: string;
    introduce: string;
    branch: string;
    deviceTypeId: number;
    status: string;
    productionTime: number;
    productionCode: string
}

export interface IUpdateTotalItem {
    item: IUpdateItem,
    itemParameters: IItemParameter[]
}
