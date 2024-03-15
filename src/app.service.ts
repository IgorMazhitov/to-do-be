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
    const userExists = await this.userRepository.findOne({
      where: { username: userName },
    });
    // check if group exists
    const groupExists = await this.taskGroupRepository.findOneBy({ name: name, userId: userExists.id});
    // check if user exists
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

  async createTask(newTaskName: string, groupId: string, userName: string) {
    try {
      const user = await this.userRepository.findOneOrFail({ where: { username: userName } });
      const group = await this.taskGroupRepository.findOneOrFail({ where: { id: groupId } });

      if (!user || !group) {
        return { success: false, error: 'User or Group does not exist' };
      }
  
      const existingTask = await this.taskRepository.findOne({ where: { name: newTaskName, taskGroup: { id: groupId } }, relations: ['taskGroup'] });

      if (existingTask && existingTask?.taskGroup?.id === group.id) {
        return { success: false, error: 'Task already exists' };
      }
  
      const task = new Task();
      task.name = newTaskName;
      task.taskGroup = group;
  
      const newTask = await this.taskRepository.save(task);
  
      return { success: true, task: newTask };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }  

  async completeTask(id: string, userName: string, groupId: string) {
    // check if task exists
    const taskExists = await this.taskRepository.findOne({ where: { id } });
    if (!taskExists) {
      return {
        success: false,
        error: 'Task does not exist',
      };
    }
    // check if task is already completed
    if (taskExists.isCompleted) {
      return {
        success: false,
        error: 'Task is already completed',
      };
    }
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
    // check if group exists
    const groupExists = await this.taskGroupRepository.findOne({
      where: { id: groupId },
    });
    if (!groupExists) {
      return {
        success: false,
        error: 'Group does not exist',
      };
    }
    const task = await this.taskRepository.save({
      ...taskExists,
      isCompleted: true,
    })

    return {
      success: true,
      task,
    };
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
