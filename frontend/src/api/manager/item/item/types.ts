export interface IGetListItem  {
    page: number,
    pageSize: number,
    minPrice: number | null,
    maxPrice: number | null,
    supplyId: number | null,
    deviceType: number | null,
    branch: string | null,
    searchString: string,
    orderField: string,
    orderBy: string
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