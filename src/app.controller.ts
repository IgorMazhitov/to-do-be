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
    console.log(name, 'name user get');
    return await this.appService.getUser(name);
  }

  @Post('/user')
  async createUser(@Query('name') name: string) {
    console.log(name, 'name user create');
    return await this.appService.createUser(name);
  }

  @Post('/group')
  createGroup(@Query('name') name: string, @Query('userName') userName: string){
    return this.appService.createGroup(name, userName);
  }

  @Post('/task')
  async createTask(@Body() body: { name: string; groupId: string }) {
    const { name, groupId } = body;
    console.log(name, groupId, 'name groupid task create');
    return await this.appService.createTask(name, groupId);
  }

  @Post()
  completeTask(id: string) {
    return this.appService.completeTask(id);
  }

  @Get('/task')
  async getTasks(@Query('userName') userName: string) {
    console.log('get tasks', userName);
    return await this.appService.getTasks(userName);
  }
}
