import { Entity, PrimaryColumn, Column, BeforeInsert, BeforeUpdate, Index, PrimaryGeneratedColumn } from 'typeorm';
import { nowInMillis } from '../../shared/utils';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int'})
  public id: number;

  @Column({ name: 'first_name', type: 'nvarchar', length: 50 })
  public firstName: string;

  @Column({ name: 'last_name', type: 'nvarchar', length: 50 })
  public lastName: string;

  @Column({ name: 'full_name', type: 'nvarchar', length: 100 })
  public fullName: string;

  @Column({ name: 'phone', type: 'nvarchar', length: 50, unique: true })
  public phone: string;

  @Column({ name: 'email', type: 'nvarchar', length: 50, unique: true})
  public email: string;

  @Column({ name: 'nationality', type: 'nvarchar', length: 50, nullable: true, default: 'Vietnamese'})
  public nationality: string;
  
  @Column({ name: 'status', type: 'nvarchar', length: 50, default: 'ACTIVE'})
  public status: string;
  
  @Column({ name: 'username', type: 'nvarchar', length: 150, unique: true})
  public username: string;

  @Column({ name: 'password_hash', type: 'nvarchar', length: 150})
  public passwordHash: string;

  @Column({ name: 'avatar_image', type: 'nvarchar', length: 400, nullable: true, default: 'https://media.istockphoto.com/id/1327592449/vector/default-avatar-photo-placeholder-icon-grey-profile-picture-business-man.jpg?s=612x612&w=0&k=20&c=yqoos7g9jmufJhfkbQsk-mdhKEsih6Di4WZ66t_ib7I='})
  public avatarImage: string;

  @Column({ name: 'birthday', type: 'bigint', nullable: true})
  public birthday: number;

  @Column({name: 'role_id', type: 'int', default: 6} )
  public roleId: number;

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
