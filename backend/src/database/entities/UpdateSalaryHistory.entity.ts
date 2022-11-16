import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('update_salary_history')
export class UpdateSalaryHistory {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'targeted_user_id', type: 'int'})
    public targetedUserId: number;

    @Column({ name: 'requested_user_id', type: 'int'})
    public requestedUserId: number;

    @Column({ name: 'old_salary', type: 'int'})
    public oldSalary: string;

    @Column({ name: 'new_salary', type: 'int'})
    public newSalary: string;

    @Column({ name: 'status', type: 'nvarchar', nullable: true })
    public status: string;

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
