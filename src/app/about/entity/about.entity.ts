import { Column, Entity, ManyToOne } from "typeorm";
import BaseEntity from "../../../db/entity/base-entity";
import { User } from "../../user/entity/user.entity";

@Entity({
  name: "about",
})
export class About extends BaseEntity {
  @Column()
  description: string;

  @Column({
    type: "simple-array",// simple-array is a typeorm type vs array -> difference between array and simple-array is that simple-array is a string array,
  })
  skills: string[];

  @Column()
  photo: string;

  // user has many abouts
  @ManyToOne(() => User, user => user.about)
  user: User;
}
