import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('staff')
export class Staff {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'user_id', type: 'int' })
    public userId: number;

    @Column({ name: 'branch_id', type: 'int', nullable: true })
    public branchId: number;

    @Column({ name: 'first_worked_date', type: 'date', nullable: true})
    public firstWorkedDate: string;

    @Column({ name: 'working_period', type: 'nvarchar', length: 50, nullable: true })
    public workingPeriod: string;

    @Column({ name: 'salary', type: 'int', nullable: true})
    public salary: number;

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
