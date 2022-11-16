import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('staff_salary')
export class StaffSalary {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'staff_id', type: 'int' })
    public staffId: number;

    @Column({ name: 'month', type: 'int' })
    public month: number;

    @Column({ name: 'year', type: 'int' })
    public year: number;

    @Column({ name: 'demand_kpi_money', type: 'int'})
    public demandKpiMoney: number;

    @Column({ name: 'demand_kpi_register_user', type: 'int'})
    public demandKpiRegisterUser: number;

    @Column({ name: 'earned_money', type: 'int'})
    public earnedMoney: number;

    @Column({ name: 'earned_register_user', type: 'int'})
    public earnedRegisterUser: number;

    @Column({ name: 'done_kpi', type: 'bool'})
    public doneKpi: boolean;

    @Column({ name: 'quality', type: 'nvarchar'})
    public quality: string;

    @Column({ name: 'bonus_salary', type: 'int'})
    public bonusSalary: number;

    @Column({ name: 'overtime_salary', type: 'int'})
    public overtimeSalary: number;

    @Column({ name: 'base_salary', type: 'int'})
    public baseSalary: number;

    @Column({ name: 'total_salary', type: 'int'})
    public totalSalary: number;

    @Column({ name: 'created_at', type: 'bigint', nullable: true })
    public createdAt: number;

    @Column({ name: 'updated_at', type: 'bigint', nullable: true })
    public updatedAt: number;

    @BeforeInsert()
    public updateCreateDates() {
        this.createdAt = nowInMillis();
        this.updatedAt = nowInMillis();
    }

    @BeforeUpdate()
    public updateUpdateDates() {
        this.updatedAt = nowInMillis();
    }

}
