export interface IGetListStaff  {
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
interface INewStaffDto {
    branchId: number,
    firstWorkedDate: number | null,
    salary: number
}
export interface ICreateStaff {
    newUserDto: INewUserDto,
    newStaffDto: INewStaffDto
}