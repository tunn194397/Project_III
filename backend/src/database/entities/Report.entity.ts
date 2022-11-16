import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('report')
export class Report {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'item_id', type: 'int' })
    public itemId: number;

    @Column({ name: 'reporter_id', type: 'int'})
    public reporterId: number;

    @Column({ name: 'message', type: 'nvarchar', length: 1000 })
    public message: string;

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
