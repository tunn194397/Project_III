import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('import_item_receipt')
export class ImportItemReceipt {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'item_id', type: 'int' })
    public itemId: number;

    @Column({ name: 'quantity', type: 'int' })
    public quantity: number;

    @Column({ name: 'import_receipt_id', type: 'int' })
    public ImportReceiptId: number;

    @Column({ name: 'price', type: 'int'})
    public price: number;

}
