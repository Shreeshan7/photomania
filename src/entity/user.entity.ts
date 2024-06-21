import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  imageUrl!: string;

  @Column()
  password!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
