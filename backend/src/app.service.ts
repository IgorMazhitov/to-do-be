import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskGroup } from './database/entities/task-group.entity';
import { Task } from './database/entities/task.entity';
import { User } from './database/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor() {}
  getHello(): string {
    return 'Hello World!';
  }
}
