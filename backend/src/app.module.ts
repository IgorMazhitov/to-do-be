import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskGroup } from './database/entities/task-group.entity';
import { Task } from './database/entities/task.entity';
import { User } from './database/entities/user.entity';
import { ToDoModule } from './todo/todo.module';
import { Contact } from './database/entities/contact.entity';
import { Tag } from './database/entities/tag.entity';
import { ContactsModule } from './contacts/contacts.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'admin',
      password: 'admin',
      database: 'database',
      entities: [TaskGroup, Task, User, Contact, Tag],
      synchronize: true,
      autoLoadEntities: true,
  }), TypeOrmModule.forFeature([TaskGroup, Task, User, Contact, Tag]), ToDoModule, ContactsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
