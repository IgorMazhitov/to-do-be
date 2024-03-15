import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('todo')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/user')
  async getUser(@Query('name') name: string) {
    return await this.appService.getUser(name);
  }

  @Post('/user')
  async createUser(@Query('name') name: string) {
    return await this.appService.createUser(name);
  }

  @Post('/group')
  async createGroup(@Query('name') name: string, @Query('userName') userName: string){
    return await this.appService.createGroup(name, userName);
  }

  @Post('/task')
  async createTask(@Body() body: { name: string; groupId: string, userName: string}) {
    const { name, groupId, userName } = body;
    return await this.appService.createTask(name, groupId, userName);
  }

  @Post('/task/complete')
  async completeTask(@Query('id') id: string, @Query('userName') userName: string, @Query('groupId') groupId: string) {
    console.log('id', id, 'userName', userName, 'groupId', groupId);
    return await this.appService.completeTask(id, userName, groupId);
  }

  @Get('/task')
  async getTasks(@Query('userName') userName: string) {
    return await this.appService.getTasks(userName);
  }
}
