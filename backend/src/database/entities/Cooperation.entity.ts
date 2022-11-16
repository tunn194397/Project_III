import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('cooperation')
export class Cooperation {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'hotline', type: 'nvarchar' })
    public hotline: string;

    @Column({ name: 'representative_id', type: 'int'})
    public representativeId: number;

    @Column({ name: 'representative_name', type: 'nvarchar'})
    public representativeName: string;

    @Column({ name: 'message', type: 'nvarchar', length: 1000 })
    public message: string;

    @Column({ name: 'link', type: 'nvarchar'})
    public link: string;

    @Column({ name: 'created_at', type: 'bigint', nullable: true })
    public createdAt: number;

    @Column({ name: 'image', type: 'nvarchar', nullable: true })
    public image: string;


    @BeforeInsert()
    public updateCreateDates() {
        this.createdAt = nowInMillis();
    }

}
