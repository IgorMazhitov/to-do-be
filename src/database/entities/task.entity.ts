import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TaskGroup } from './task-group.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column('text', { nullable: true })
  detail: string;

  @ManyToOne(() => TaskGroup, { onDelete: 'CASCADE' })
  @JoinColumn()
  taskGroup: TaskGroup;
}
