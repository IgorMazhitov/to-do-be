import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post('/create')
  async createContact(
    @Body()
    body: {
      name?: string;
      userName: string;
      homePhone?: string;
      workPhone?: string;
      email?: string;
      address?: string;
      tags?: string[];
    },
  ) {
    const { name, userName, homePhone, workPhone, email, address, tags } = body;
    return await this.contactsService.createContact(name, userName, homePhone, workPhone, email, address, tags);
  }

  @Get()
  async getContacts(@Query('userName') userName: string) {
    return await this.contactsService.getContacts(userName)
  }

  @Post('/remove')
  async removeContact(@Query('userName') userName: string, @Query('contactId') contactId: string) {
    return await this.contactsService.removeContact(userName, contactId)
  }

  @Post('/tag')
  async createTag(@Query('userName') userName: string, @Query('tagName') tagName: string) {
    return await this.contactsService.createTag(userName, tagName)
  }

  @Get('/tag')
  async getTags(@Query('userName') userName: string) {
    return await this.contactsService.getTags(userName)
  }
}
