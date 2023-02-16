export interface IGetListCustomer  {
    page: number,
    pageSize: number,
    registerStaffId: number | null,
    registerType: string | null,
    level: string | null,
    minScore: number | null,
    maxScore: number | null,
    status: string | null,
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
interface INewCustomerDto {
    registerType: string,
    registerStaffId: number | null
}
export interface ICreateCustomer {
    newUserDto: INewUserDto,
    newCustomerDto: INewCustomerDto
}

interface IUpdateUserDto {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    status: string,
    birthday: number,
}

interface IUpdateCustomerDto {
    registerType: string | null,
    registerStaffId: string | null,
    level: string | null,
    score: string | null
}

export interface IUpdateCustomer {
    updateUser: IUpdateUserDto,
    updateCustomer: IUpdateCustomerDto
}