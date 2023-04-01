import { Column, Entity } from 'typeorm';
import BaseEntity from '../../../db/entity/base-entity';

@Entity()
export class BannerEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false
  })
  description: string;

  @Column()
  isActive: boolean;
}
