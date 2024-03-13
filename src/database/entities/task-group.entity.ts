import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Task } from './task.entity';

@Entity()
export class TaskGroup {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => User, (user) => user.taskGroups)
  user: User;

  @OneToMany(() => Task, (task) => task.taskGroup)
  tasks: Task[];
}
