import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ToDoService } from './todo.service';

@Controller('todo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  @Get('/user')
  async getUser(@Query('name') name: string) {
    return await this.toDoService.getUser(name);
  }

  @Post('/user')
  async createUser(@Query('name') name: string) {
    return await this.toDoService.createUser(name);
  }

  @Post('/group')
  async createGroup(@Query('name') name: string, @Query('userName') userName: string){
    return await this.toDoService.createGroup(name, userName);
  }

  @Post('/task')
  async createTask(@Body() body: { name: string; groupId: string, userName: string}) {
    const { name, groupId, userName } = body;
    return await this.toDoService.createTask(name, groupId, userName);
  }

  @Post('/task/complete')
  async completeTask(@Query('id') id: string, @Query('userName') userName: string, @Query('groupId') groupId: string) {
    return await this.toDoService.completeTask(id, userName, groupId);
  }

  @Get('/task')
  async getTasks(@Query('userName') userName: string) {
    return await this.toDoService.getTasks(userName);
  }
}
