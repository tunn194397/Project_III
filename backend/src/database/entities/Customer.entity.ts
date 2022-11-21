import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('customer')
export class Customer {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'user_id', type: 'int' })
    public userId: number;

    @Column({ name: 'register_type', type: 'nvarchar', default: 'STAFF' })
    public registerType: string;

    @Column({ name: 'register_staff_id', type: 'int', nullable: true })
    public registerStaffId: number;

    @Column({ name: 'level', type: 'nvarchar', default: 'NEW' })
    public level: string;

    @Column({ name: 'score', type: 'int', default: 0})
    public score: number

}
