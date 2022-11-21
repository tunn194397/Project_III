import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('warehouse')
export class Warehouse {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'item_id', type: 'int' })
    public itemId: number;

    @Column({ name: 'total_quantity', type: 'int', nullable: true })
    public totalQuantity: number;

    @Column({ name: 'sole_quantity', type: 'int', default: 0 })
    public soleQuantity: number;

    @Column({ name: 'remain_quantity', type: 'int', nullable: true})
    public remainQuantity: number;

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
