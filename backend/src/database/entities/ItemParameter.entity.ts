import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('item_parameter')
export class ItemParameter {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'item_id', type: 'int' })
    public itemId: number;

    @Column({ name: 'device_parameter_id', type: 'int' })
    public deviceParameterId: number;

    @Column({ name: 'value', type: 'nvarchar' })
    public value: string;

}
