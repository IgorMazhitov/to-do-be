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

  async getUser(name: string) {
    const user = await this.userRepository.findOne({
      where: { username: name },
    });
    if (user) {
      return {
        success: true,
        user,
      };
    } else {
      return {
        success: false,
        error: 'User not found',
      };
    }
  }

  async createUser(name: string) {
    // Check if User already exists
    const userExists = await this.userRepository.findOne({
      where: { username: name },
    });
    if (userExists) {
      return {
        success: false,
        error: 'User already exists',
      };
    }
    const newUser = new User();
    newUser.username = name;
    const createdUser = await this.userRepository.save(newUser);
    return {
      success: true,
      user: createdUser,
    };
  }

  async createGroup(name: string, userName: string) {
    // check if group exists
    const groupExists = await this.taskGroupRepository.findOneBy({ name: name });
    // check if user exists
    const userExists = await this.userRepository.findOne({
      where: { username: userName },
    });
    if (groupExists || !userExists) {
      return {
        success: false,
        error: 'Group already exists or User does not exist',
      };
    }
    const group = new TaskGroup();
    group.name = name;
    group.userId = userExists.id;
    group.user = userExists; // Assign the actual User entity
    group.tasks = [];
    const newGroup = await this.taskGroupRepository.save(group);
    return {
      success: true,
      group: newGroup,
    };
  }

  async createTask(name: string, groupId: string) {
    // check if user exists
    const userExists = await this.userRepository.findOne({
      where: { username: name },
    });
    // check if group exists
    const groupExists = await this.taskGroupRepository.findOne({
      where: { id: groupId },
    });
    if (!userExists || !groupExists) {
      return {
        success: false,
        error: 'User or Group does not exist',
      };
    }
    const task = new Task();
    task.name = name;
    task.taskGroup = groupExists; // Assign the actual TaskGroup entity
    const newTask = await this.taskRepository.save(task);
    return {
      success: true,
      task: newTask,
    };
  }

  completeTask(id: string) {
    return this.taskRepository.update(id, { isCompleted: true });
  }

  async getTasks(userName: string) {
    // check if user exists
    const userExists = await this.userRepository.findOne({
      where: { username: userName },
    });
    if (!userExists) {
      return {
        success: false,
        error: 'User does not exist',
      };
    }
    const groups = await this.taskGroupRepository.find({
      where: { userId: userExists.id },
      relations: ['tasks'],
    });
    console.log(groups, 'get tasks groups');

    if (!groups) {
      return {
        success: false,
        error: 'No groups found',
      };
    } else {
      return {
        success: true,
        groups,
      };
    }
  }
}
