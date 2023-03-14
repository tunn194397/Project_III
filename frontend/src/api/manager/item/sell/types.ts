export interface IGetListSellReceipt  {
    page: number,
    pageSize: number,
    customerId: number | null,
    staffId: number | null,
    minPrice: number | null,
    maxPrice: number | null,
    minSaleOff: number | null,
    maxSaleOff: number | null,
    searchString: string,
    orderField: string,
    orderBy: string
}

interface ISellReceipt {
    customerId: number,
    staffId: number,
    content: string | null,
    note: string | null,
    voucherId: number | null
}

interface ISellReceiptItem {
    itemId: number,
    quantity: number
}

export interface ICreateSellReceipt {
    receipt: ISellReceipt,
    receiptItems: ISellReceiptItem[]
}