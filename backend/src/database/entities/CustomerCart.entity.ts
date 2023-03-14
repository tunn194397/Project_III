import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity('customer_cart')
export class CustomerCart {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'customer_id', type: 'int' })
    public userId: number;

    @Column({ name: 'item_id', type: 'int'})
    public itemId: number;

    @Column({ name: 'quantity', type: 'int', default: 1})
    public quantity: number;

}
