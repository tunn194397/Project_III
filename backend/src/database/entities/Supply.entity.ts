import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('supply')
export class Supply {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'name', type: 'nvarchar' })
    public name: string;

    @Column({ name: 'address', type: 'nvarchar' })
    public address: string;

    @Column({ name: 'email', type: 'nvarchar' })
    public email: string;

    @Column({ name: 'phone', type: 'nvarchar'})
    public phone: string;

    @Column({ name: 'image', type: 'nvarchar' })
    public image: string;

    @Column({ name: 'representative_id', type: 'int'})
    public representativeId: number;

    @Column({ name: 'representative_name', type: 'nvarchar'})
    public representativeName: string;

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
