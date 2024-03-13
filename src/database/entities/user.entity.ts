import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { TaskGroup } from './task-group.entity';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  username: string;

  @OneToMany(() => TaskGroup, (taskGroup) => taskGroup.user)
  taskGroups: TaskGroup[];
}
