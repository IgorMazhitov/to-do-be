import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';


@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  homePhone?: string;

  @Column()
  workPhone?: string;

  @Column()
  email?: string;

  @Column()
  address?: string;

  @Column('simple-array')
  tags?: string[];

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.contacts)
  @JoinColumn({ name: 'userId' })
  user: User;
}
