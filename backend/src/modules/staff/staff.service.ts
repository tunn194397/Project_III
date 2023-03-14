import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Staff, Manager, User, Role, Branch} from "../../database/entities";
import {Brackets, Repository} from "typeorm";
import {NewUserDto} from "../manager/dto/newUser.dto";
import * as bcrypt from 'bcrypt';
import {NewStaffDto} from "./dto/newStaff.dto";
import {UpdateStaffDetailDto} from "./dto/updateStaffDetail.dto";
import {FindStaffDto} from "./dto/findStaff.dto";

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private staffRepository: Repository<Staff>,

        @InjectRepository(User)
        private userRepository: Repository<User>,

        @InjectRepository(Branch)
        private branchRepository: Repository<Branch>,
    ) {}

    async getList(findDto: FindStaffDto) {
        const pageSize = Number(findDto.pageSize) || 10;
        const page = Number(findDto.page) || 1;
        const orderField =  findDto.orderField || 'id';
        const orderBy = findDto.orderBy || 'ASC';
        const searchString = findDto.searchString || '';
        const salary = findDto.salary || '';
        const workingPeriod =  findDto.workingPeriod || '';
        const staffRoleId = Number(findDto.staffRoleId) || 0;

        let qb = this.staffRepository.createQueryBuilder('staff')
            .innerJoin(User, 'user', 'user.id = staff.user_id')
            .innerJoin(Role, 'role', 'role.id = user.role_id')
            .leftJoin(Branch, 'branch', 'branch.id = staff.branch_id')
            .where(new Brackets(qb => {
                qb.where('user.full_name like :searchString', {searchString: `%${searchString}%`})
                .orWhere('user.first_name like :searchString', {searchString: `%${searchString}%`})
                .orWhere('user.last_name like :searchString', {searchString: `%${searchString}%`})
                .orWhere('user.email like :searchString', {searchString: `%${searchString}%`})
                .orWhere('user.phone like :searchString', {searchString: `%${searchString}%`})
            }))


        if (orderField === 'id') qb.orderBy('user.id', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'email') qb.orderBy('user.email', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'phone') qb.orderBy('user.phone', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'role') qb.orderBy('role.role', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'name') qb.orderBy('user.full_name', orderBy==='ASC' ? 'ASC': 'DESC')
        else if (orderField === 'branch') qb.orderBy('branch.name', orderBy==='ASC' ? 'ASC': 'DESC')


        if (salary !== '') {
            let minSalary = 0, maxSalary =2000000;
            if (salary === '2-5') {minSalary = 2000000; maxSalary=5000000}
            if (salary === '5-10') {minSalary = 5000000; maxSalary=10000000}
            if (salary === '10-20') {minSalary = 10000000; maxSalary=20000000}
            if (salary === '20-50') {minSalary = 20000000; maxSalary=50000000}
            if (salary === '>50') {minSalary = 50000000; maxSalary = 0}
            qb= qb.andWhere('staff.salary >= :minSalary', {minSalary: minSalary})
            if (maxSalary > 0) qb = qb.andWhere('staff.salary <= :maxSalary', {maxSalary: maxSalary})
        }

        if (workingPeriod !== '') {
            let minTime = new Date(), maxTime = new Date(), thisYear = minTime.getFullYear();
            if (workingPeriod === '2-5') { minTime.setFullYear(thisYear - 2); maxTime.setFullYear(thisYear - 5)}
            if (workingPeriod === '5-10') { minTime.setFullYear(thisYear - 5); maxTime.setFullYear(thisYear - 10)}
            if (workingPeriod === '10-20') {minTime.setFullYear(thisYear - 10);maxTime.setFullYear(thisYear - 20)}
            if (workingPeriod === '>20') {minTime.setFullYear(thisYear - 20); maxTime.setFullYear(thisYear - 50)}
            qb = qb.andWhere('staff.first_worked_date >= :minTime and staff.first_worked_date <= :maxTime', {minTime: maxTime.getTime(), maxTime: minTime.getTime()})
        }

        if (staffRoleId && staffRoleId !== 0) {
            qb= qb.andWhere('user.role_id = :staffRoleId', {staffRoleId: staffRoleId})
        }

        let total = await qb.select(['count(user.id) as total']).execute()
        const totalItem = Number(total[0].total);
        const totalPage = Math.ceil(totalItem/pageSize);

        return {
            result: await qb
                .select([
                    'staff.id as staffId',
                    'staff.branch_id as branchId',
                    'staff.salary as salary',
                    'staff.first_worked_date as firstWorkedDate',
                    'staff.working_period as workingPeriod',
                    'user.id as id',
                    'user.first_name as firstName',
                    'user.last_name as lastName',
                    'user.full_name as fullName',
                    'user.phone as phone',
                    'user.email as email',
                    'user.status as status',
                    'role.role as role',
                    'user.avatar_image as image',
                    'branch.name as branch',
                    'branch.address as branchAddress'
                ])
                .offset((page-1) * pageSize)
                .limit(pageSize)
                .execute(),
            pagination : {
                totalItem: totalItem,
                totalPage: totalPage,
                currentPage: Number(page),
                pageSize: Number(pageSize),
                currentPageSize: (page >= totalPage) ? Number(totalItem - (totalPage - 1) * pageSize) : Number(pageSize)
            }
        }
    }

    async getStaffDetail(id: number) {
        let staff = await this.staffRepository.findOne({userId:id});
        let branch;
        if (staff) {
            branch = await this.branchRepository.findOne({id: staff.branchId})
            const yearDiff = (new Date()).getFullYear() - (new Date(Number(staff.firstWorkedDate))).getFullYear()
            const monthDiff = (new Date()).getMonth() - (new Date(Number(staff.firstWorkedDate))).getMonth()
            staff.workingPeriod = yearDiff === 0 ? ((monthDiff === 0) ? " This month" : (monthDiff + " months")) : (yearDiff + " years")
        }
        const user =  await this.userRepository.findOne({id: id})
        return {
            staff: {...staff, branch: branch} ,
            user: user
        }
    }

    async createNewStaff(newUserDto: NewUserDto, newStaffDto: NewStaffDto) {
        if (newUserDto.roleId !== 5 && newUserDto.roleId !== 8) return new HttpException(
            ["Invalid Role!"],
            HttpStatus.BAD_REQUEST,
        );
        const newUser = this.userRepository.create(newUserDto);
        newUser.fullName = newUser.firstName + ' ' + newUser.lastName;
        const saltOrRounds = 10;
        newUser.passwordHash =  await bcrypt.hash(
            newUserDto.password,
            saltOrRounds,
        );
        const newUserEntity = await this.userRepository.save(newUser);

        const newStaff = await this.staffRepository.create(newStaffDto);
        newStaff.userId = newUserEntity.id;
        return {
            user: newUserEntity,
            staff: await this.staffRepository.save(newStaff)
        }
    }

    async updateStaffDetail(id: number, updateStaffDto: UpdateStaffDetailDto) {
        const staffUpdate = await this.staffRepository.update(
            {userId: id},
            updateStaffDto.updateStaff
        )
        const userUpdate = await this.userRepository.update(
            {id: id},
            {...updateStaffDto.updateUser, fullName: updateStaffDto.updateUser.firstName + ' ' + updateStaffDto.updateUser.lastName}
        )

        return {staffUpdate, userUpdate}
    }

}