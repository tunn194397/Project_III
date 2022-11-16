import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('address')
export class Address {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'country', type: 'nvarchar' })
    public country: string;

    @Column({ name: 'province', type: 'nvarchar', length: 1000 })
    public province: string;

    @Column({ name: 'district', type: 'nvarchar', length: 1000 })
    public district: string;

    @Column({ name: 'ward', type: 'nvarchar', length: 1000 })
    public ward: string;

    @Column({ name: 'street', type: 'nvarchar', length: 1000 })
    public street: string;

    @Column({ name: 'apartment_number', type: 'int'})
    public apartmentNumber: string;
}
