import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  caption!: string;

  @Column()
  imageUrl!: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;
}
