export interface IGetListImportReceipt  {
    page: number,
    pageSize: number,
    supplyId: number | null,
    minPrice: number | null,
    maxPrice: number | null,
    minSaleOff: number | null,
    maxSaleOff: number | null,
    searchString: string,
    orderField: string,
    orderBy: string
}

interface IImportReceipt {
    customerId: number,
    staffId: number,
    content: string | null,
    note: string | null,
    voucherId: number | null
}

interface IImportReceiptItem {
    itemId: number,
    quantity: number
}

export interface ICreateImportReceipt {
    receipt: IImportReceipt,
    receiptItems: IImportReceiptItem[]
}

export interface IGetHomeData {
    startedAt: number | null,
    finishedAt: number | null
}