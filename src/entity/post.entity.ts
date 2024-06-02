import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  caption!: string;

  @Column()
  imageUrl!: string;

  @ManyToOne(() => User, user => user.posts)
  user!: User;
}