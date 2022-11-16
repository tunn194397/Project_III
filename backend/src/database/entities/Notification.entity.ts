import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('notification')
export class Notification {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'user_id', type: 'int' })
    public userId: number;

    @Column({ name: 'status', type: 'bool', default: true})
    public status: boolean;

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
