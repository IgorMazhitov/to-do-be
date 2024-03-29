import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { TaskGroup } from './task-group.entity';
import { Contact } from './contact.entity';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  username: string;

  @OneToMany(() => TaskGroup, (taskGroup) => taskGroup.userId)
  taskGroups: TaskGroup[];

  @OneToMany(() => Contact, (contact) => contact.user)
  contacts: Contact[];
}
