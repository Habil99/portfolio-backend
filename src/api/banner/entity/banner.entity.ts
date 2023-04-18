import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import BaseEntity from '../../../db/entity/base-entity';
import { User } from "../../user/entity/user.entity";

@Entity({
  name: "banners"
})
export class Banner extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

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

  // each banner has one user
  @ManyToOne(() => User, user => user.banners)
  user: User;
}
