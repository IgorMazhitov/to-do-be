import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskGroup } from './database/entities/task-group.entity';
import { Task } from './database/entities/task.entity';
import { User } from './database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(TaskGroup)
    private taskGroupRepository: Repository<TaskGroup>,
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }

  createGroup(name: string) {
    const group = new TaskGroup();
    group.name = name;
    return this.taskGroupRepository.save(group);
  }

  createTask(name: string, detail: string, groupId: string) {
    const task = new Task();
    task.name = name;
    task.detail = detail;
    task.taskGroup = { id: groupId } as TaskGroup;
    return this.taskRepository.save(task);
  }

  completeTask(id: string) {
    return this.taskRepository.update(id, { isCompleted: true });
  }
}
