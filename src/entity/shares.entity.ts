import { Column, Entity } from 'typeorm';
import { BaseIdEntity } from './base/base.entity';

@Entity('shares')
export class SharesEntity extends BaseIdEntity {
  @Column()
  host: string;
  @Column()
  user_id: string;
  @Column()
  password: string;
}
