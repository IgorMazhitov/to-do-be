import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskGroup } from './database/entities/task-group.entity';
import { Task } from './database/entities/task.entity';
import { User } from './database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([TaskGroup, Task, User])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
