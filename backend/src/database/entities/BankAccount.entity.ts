import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('bank_account')
export class BankAccount {
    @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
    public id: number;

    @Column({ name: 'user_id', type: 'nvarchar' })
    public userId: string;

    @Column({ name: 'bank_name', type: 'nvarchar', length: 1000 })
    public bankName: string;

    @Column({ name: 'bank_wallet', type: 'nvarchar', length: 1000 })
    public bankWallet: string;

    @Column({ name: 'bank_account_number', type: 'nvarchar', length: 1000 })
    public bankAccountNumber: string;

    @Column({ name: 'bank_account_holder_name', type: 'nvarchar', length: 1000 })
    public bank_account_holder_name: string;

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
