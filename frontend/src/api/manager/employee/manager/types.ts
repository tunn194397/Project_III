export interface IGetListManager  {
    page: number,
    pageSize: number,
    searchString: string,
    orderField: string,
    orderBy: string
}


interface INewUserDto {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    status: string,
    birthday: number,
    username: string,
    password: string,
    roleId: number
}
interface INewManagerDto {
    branchId: number,
    certificate: string,
    introduce: string,
    salary: number
}
export interface ICreateManager {
    newUserDto: INewUserDto,
    newManagerDto: INewManagerDto
}
