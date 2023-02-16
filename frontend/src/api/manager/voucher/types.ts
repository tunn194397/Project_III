export interface IGetListVoucher {
    page: number,
    pageSize: number,
    deviceType: string | null,
    deviceBranch: string | null,
    startedAt: number | null,
    finishedAt: number | null,
    minOff: number | null,
    maxOff: number | null,
    status: string | null,
    searchString: string,
    orderBy: string,
    orderField: string
}

export interface ICreateVoucher {
    content: string | null,
    deviceBranches: string[],
    deviceTypeIds: number[],
    startedAt: number | null,
    finishedAt: number | null,
    image: string | null,
    offValue: number,
}