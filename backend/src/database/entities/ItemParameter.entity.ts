import {
    Entity,
    PrimaryColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    Index,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { nowInMillis } from '../../shared/utils';
import {Item} from "./Item.entity";

@Entity('item_parameter')
export class ItemParameter {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'device_parameter_id', type: 'int' })
    public deviceParameterId: number;

    @Column({ name: 'value', type: 'nvarchar', nullable: true })
    public value: string;

    @Column({ name: 'detail', type: 'nvarchar', nullable: true })
    public detail: string;

    @ManyToOne(type => Item, item => item.parameter)
    item: Item

}
