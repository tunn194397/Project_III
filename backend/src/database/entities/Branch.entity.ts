import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('branch')
export class Branch {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'cooperation_id', type: 'int' })
    public cooperationId: number;

    @Column({ name: 'address', type: 'nvarchar'})
    public address: string;

    @Column({ name: 'hotline', type: 'nvarchar'})
    public hotline: string;

    @Column({ name: 'email', type: 'nvarchar', length: 1000 })
    public email: string;

    @Column({ name: 'representative', type: 'nvarchar'})
    public representative: string;

    @Column({ name: 'image', type: 'nvarchar', nullable: true })
    public image: string;

    @Column({ name: 'created_at', type: 'bigint', nullable: true })
    public createdAt: number;

    @BeforeInsert()
    public updateCreateDates() {
        this.createdAt = nowInMillis();
    }

}
