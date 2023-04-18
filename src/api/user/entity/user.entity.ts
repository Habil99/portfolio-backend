import BaseEntity from "../../../db/entity/base-entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Banner } from "../../banner/entity/banner.entity";
import { About } from "../../about/entity/about.entity";

/**
 * @field id
 * @field createdAt
 * @field updatedAt
 * @field deletedAt
 * @field username
 * @field email
 * @field password
 */

@Entity({
  name: "users",
})
@Unique(["username", "email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
  })
  accessToken: string;

  @Column({
    default: false,
  })
  isDeleted: boolean;

  // each user has many banners
  @OneToMany(() => Banner, banner => banner.user)
  banners: Banner[];

  @OneToMany(() => Banner, banner => banner.user)
  about: About[];
}
