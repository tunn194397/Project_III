import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('manager')
export class Manager {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'user_id', type: 'int' })
    public userId: number;

    @Column({ name: 'branch_id', type: 'int', nullable: true })
    public branchId: number;

    @Column({ name: 'certificates', type: 'nvarchar', length: 1000 , nullable: true})
    public certificates: string;

    @Column({ name: 'introduce', type: 'nvarchar', length: 1000, nullable: true })
    public introduce: string;

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
