import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('sell_receipt')
export class SellReceipt {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'customer_id', type: 'int' })
    public customerId: number;

    @Column({ name: 'staff_id', type: 'int' })
    public staffId: number;

    @Column({ name: 'total_price', type: 'int' })
    public totalPrice: number;

    @Column({ name: 'content', type: 'nvarchar'})
    public content: string;

    @Column({ name: 'note', type: 'nvarchar'})
    public note: string;

    @Column({ name: 'sale_off', type: 'integer'})
    public saleOff: number;

    @Column({ name: 'finalPrice', type: 'integer'})
    public finalPrice: number;

    @Column({ name: 'created_at', type: 'bigint', nullable: true })
    public createdAt: number;

    @Column({ name: 'updated_at', type: 'bigint', nullable: true })
    public updatedAt: number;

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
