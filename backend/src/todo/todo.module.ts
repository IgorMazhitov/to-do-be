import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ToDoController } from "./todo.controller";
import { ToDoService } from "./todo.service";
import { User } from "src/database/entities/user.entity";
import { TaskGroup } from "src/database/entities/task-group.entity";
import { Task } from "src/database/entities/task.entity";


@Module({
  imports: [
    TypeOrmModule.forFeature([
        User,
        TaskGroup,
        Task
    ])
  ],
  controllers: [ToDoController],
  providers: [ToDoService],
})
export class ToDoModule {}
