import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  createGroup(name: string) {
    return this.appService.createGroup(name);
  }

  @Post()
  createTask(name: string, detail: string, groupId: string) {
    return this.appService.createTask(name, detail, groupId);
  }

  @Post()
  completeTask(id: string) {
    return this.appService.completeTask(id);
  }
}
