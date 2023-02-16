import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('import_receipt')
export class ImportReceipt {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'supply_id', type: 'int', nullable: true })
    public supplyId: number;

    @Column({ name: 'total_price', type: 'int', nullable: true })
    public totalPrice: number;

    @Column({ name: 'content', type: 'nvarchar', nullable: true})
    public content: string;

    @Column({ name: 'note', type: 'nvarchar', nullable: true})
    public note: string;

    @Column({ name: 'sale_off', type: 'integer', nullable: true})
    public saleOff: number;

    @Column({ name: 'final_price', type: 'integer', nullable: true})
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
