import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'register_type', type: 'nvarchar' })
    public branchId: string;

    @Column({ name: 'register_staff_id', type: 'int' })
    public firstWorkedDate: number;

    @Column({ name: 'level', type: 'nvarchar' })
    public workingPeriod: string;

    @Column({ name: 'score', type: 'int'})
    public salary: number

}
