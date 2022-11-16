import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('role')
export class Role {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'role', type: 'nvarchar' })
    public role: number;

}
