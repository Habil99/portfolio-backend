import { Column, PrimaryGeneratedColumn } from 'typeorm';

class BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'bigint'
  })
  id: number;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true
  })
  deletedAt: Date;
}

export default BaseEntity;
