import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('device_type')
export class DeviceType {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'name', type: 'nvarchar' })
    public name: string;

    @Column({ name: 'parent_id', type: 'int', default: 0 })
    public parentId: number;
}
