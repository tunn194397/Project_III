export interface IGetListWarehouse {
    page: number,
    pageSize: number,
    minTotalQuantity: number | null,
    maxTotalQuantity: number | null,
    minSoleQuantity: number | null,
    maxSoleQuantity: number | null,
    minRemainQuantity: number | null,
    maxRemainQuantity: number | null,
    itemId: number | null,
    deviceTypeId: number | null,
    branch: string | null,
    searchString: string,
    orderBy: string,
    orderField: string
}