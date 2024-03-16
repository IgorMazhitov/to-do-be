import { Module } from "@nestjs/common/decorators/modules/module.decorator";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ContactsController } from "./contacts.controller";
import { ContactsService } from "./contacts.service";
import { User } from "src/database/entities/user.entity";
import { Contact } from "src/database/entities/contact.entity";
import { Tag } from "src/database/entities/tag.entity";


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
