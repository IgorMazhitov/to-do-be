import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TaskGroup } from './task-group.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  detail: string;

  @Column({ default: false })
  isCompleted: boolean;

  @ManyToOne(() => TaskGroup, { onDelete: 'CASCADE' })
  @JoinColumn()
  taskGroup: TaskGroup;
}
