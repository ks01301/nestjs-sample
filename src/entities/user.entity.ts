import { Column, Entity, PrimaryColumn } from 'typeorm';
import { BaseEntity } from './base/base.entity';

@Entity('user')
export class UserEntity extends BaseEntity {
  @PrimaryColumn()
  id: string;
  @Column()
  hash_password: string;
  @Column()
  user_name: string;
}
