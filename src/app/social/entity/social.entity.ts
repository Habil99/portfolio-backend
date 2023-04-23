import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../../../db/entity/base-entity";
import { User } from "../../user/entity/user.entity";
import { SocialType } from "../../../types";

@Entity({
  name: "social",
})
export class Social extends BaseEntity {
  @Column({
    type: "jsonb",
  })
  facebook: SocialType;

  @Column({
    nullable: true,
    type: "jsonb",
  })
  twitter: SocialType;

  @Column({
    nullable: true,
    type: "jsonb",
  })
  instagram: SocialType;

  @Column({
    type: "jsonb",
  })
  linkedin: SocialType;

  @Column({
    type: "jsonb",
  })
  github: SocialType;

  @Column({
    nullable: true,
    type: "jsonb",
  })
  medium: SocialType;

  @ManyToOne(() => User, (user) => user.social)
  user: User;
}
