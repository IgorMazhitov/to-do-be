import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contact } from "src/database/entities/contact.entity";
import { Tag } from "src/database/entities/tag.entity";
import { TaskGroup } from "src/database/entities/task-group.entity";
import { Task } from "src/database/entities/task.entity";
import { User } from "src/database/entities/user.entity";
import { ContactsController } from "./contacts.controller";
import { ContactsService } from "./contacts.service";


@Module({
  imports: [
    TypeOrmModule.forFeature([
        User,
        Contact,
        Tag
    ])
  ],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
