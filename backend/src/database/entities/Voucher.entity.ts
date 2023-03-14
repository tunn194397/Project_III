import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';
import {Max, Min} from "class-validator";

@Entity('voucher')
export class Voucher {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'content', type: 'nvarchar', length: 500 })
    public content: string;

    @Column({ name: 'device_type_ids', type: 'nvarchar', length: 500 })
    public deviceTypeIds: string;

    @Column({ name: 'device_branches', type: 'nvarchar', length: 500 })
    public deviceBranches: string;

    @Column({ name: 'started_at', type: 'bigint', nullable: true })
    public startedAt: number;

    @Column({ name: 'finished_at', type: 'bigint', nullable: true })
    public finishedAt: number;

    @Column({ name: 'status', type: 'nvarchar', length: 50, default: 'OPENING_SOON'})
    public status: string;

    @Column({ name: 'image', type: 'nvarchar', length: 500, nullable: true})
    public image: string;

    @Column({ name: 'off_value', type: 'integer' })
    @Min(0)
    @Max(100)
    public offValue: number;

    @Column({ name: 'off_string', type: 'nvarchar', length: 500 })
    public offString: string;

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
