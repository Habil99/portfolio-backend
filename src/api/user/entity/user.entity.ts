import BaseEntity from '../../../db/entity/base-entity';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

/**
 * @field id
 * @field createdAt
 * @field updatedAt
 * @field deletedAt
 * @field username
 * @field email
 * @field password
 */

@Entity()
@Unique(['username', 'email'])
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true
  })
  accessToken: string;

  @Column({
    default: false
  })
  isDeleted: boolean;
}
