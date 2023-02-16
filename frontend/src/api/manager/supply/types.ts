export interface IGetListSupply {
    page: number,
    pageSize: number,
    startDate: number | null,
    endDate: number | null,
    status: string | null,
    searchString: string,
    orderField: string,
    orderBy: string
}

export interface ICreateSupply {
    name: string,
    address: string,
    email: string,
    phone: string,
    imageUrl: string,
    representativeId: number
}