export interface IGetCart {
    customerId: number | null | undefined
}

export interface IAddNewItemToCart {
    itemId: number,
    customerId: number | null | undefined
}

export interface IDeleteItemInCart {
    cartId: number,
    customerId: number | null | undefined
}

export interface IUpdateBankInformation {
    customerId: number | null | undefined,
    bankName: string,
    bankAccount: string,
    bankOwner: string,
    phone: string,
    address: string
}