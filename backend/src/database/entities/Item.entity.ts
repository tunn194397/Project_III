import {
    Entity,
    PrimaryColumn,
    Column,
    BeforeInsert,
    BeforeUpdate,
    Index,
    PrimaryGeneratedColumn,
    OneToMany, JoinTable
} from 'typeorm';
import { nowInMillis } from '../../shared/utils';
import {ItemParameter} from "./ItemParameter.entity";

@Entity('item')
export class Item {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'name', type: 'nvarchar' })
    public name: string;

    @Column({ name: 'type', type: 'nvarchar' })
    public type: string;

    @Column({ name: 'price', type: 'int' })
    public price: number;

    @Column({ name: 'import_price', type: 'int' })
    public importPrice: number;

    @Column({ name: 'content', type: 'nvarchar'})
    public content: string;

    @Column({ name: 'image', type: 'nvarchar'})
    public image: string;

    @Column({ name: 'introduce', type: 'nvarchar'})
    public introduce: string;

    @Column({ name: 'branch', type: 'nvarchar'})
    public branch: string;

    @Column({ name: 'device_type_id', type: 'int'})
    public deviceTypeId: number;

    @Column({ name: 'status', type: 'nvarchar', default: 'NEW'})
    public status: string;

    @Column({ name: 'production_time', type: 'bigint', nullable: true })
    public productionTime: number;

    @Column({ name: 'production_code', type: 'nvarchar', nullable: true, unique: true})
    public productionCode: string;

    @Column({ name: 'supply_id', type: 'int', nullable: true})
    public supplyId: number;

    @Column({ name: 'created_at', type: 'bigint', nullable: true })
    public createdAt: number;

    @Column({ name: 'updated_at', type: 'bigint', nullable: true })
    public updatedAt: number;

    @OneToMany(type => ItemParameter, parameter => parameter.item)
    @JoinTable()
    parameter: ItemParameter[]

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
