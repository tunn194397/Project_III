import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('device_parameter')
export class DeviceParameter {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'device_type_id', type: 'int' })
    public deviceTypeId: number;

    @Column({ name: 'param_name', type: 'nvarchar' })
    public paramName: string;

    @Column({ name: 'param_unit', type: 'nvarchar' })
    public paramUnit: string;

    @Column({name: 'is_first_intro', type: 'boolean'})
    public isFirstIntro: boolean

}
