import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('role_permission')
export class RolePermission {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'role_id', type: 'int' })
    public roleId: number;

    @Column({ name: 'permission', type: 'nvarchar', length: 1000 })
    public permission: string;
}
