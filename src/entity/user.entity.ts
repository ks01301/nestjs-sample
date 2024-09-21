import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  user_id: string;
  @Column()
  hash_password: string;
  @Column()
  name: string;
  @Column({ nullable: true })
  currentRefreshToken: string;
}
