import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('sell_item_receipt')
export class SellItemReceipt {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'item_id', type: 'int' })
    public itemId: number;

    @Column({ name: 'quantity', type: 'int' })
    public quantity: number;

    @Column({name: 'voucher_id', type: 'int', nullable: true})
    public voucherId: number;

    @Column({ name: 'sell_receipt_id', type: 'int' })
    public sellReceiptId: number;

    @Column({ name: 'price', type: 'int'})
    public price: number;

}
