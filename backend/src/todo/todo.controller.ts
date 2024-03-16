import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ToDoService } from './todo.service';

@Controller('todo')
export class ToDoController {
  constructor(private readonly toDoService: ToDoService) {}

  /**
   * Endpoint to get user details.
   * @param name The name of the user.
   * @returns User details.
   */
  @Get('/user')
  async getUser(@Query('name') name: string) {
    return await this.toDoService.getUser(name);
  }

  /**
   * Endpoint to create a new user.
   * @param name The name of the user to create.
   * @returns The newly created user.
   */
  @Post('/user')
  async createUser(@Query('name') name: string) {
    return await this.toDoService.createUser(name);
  }

  /**
   * Endpoint to create a new group.
   * @param name The name of the group to create.
   * @param userName The username of the group creator.
   * @returns The newly created group.
   */
  @Post('/group')
  async createGroup(@Query('name') name: string, @Query('userName') userName: string){
    return await this.toDoService.createGroup(name, userName);
  }

  /**
   * Endpoint to create a new task.
   * @param body The task details including name, groupId, and userName.
   * @returns The newly created task.
   */
  @Post('/task')
  async createTask(@Body() body: { name: string; groupId: string, userName: string}) {
    const { name, groupId, userName } = body;
    return await this.toDoService.createTask(name, groupId, userName);
  }

  /**
   * Endpoint to mark a task as completed.
   * @param id The ID of the task to mark as completed.
   * @param userName The username of the task assignee.
   * @param groupId The ID of the group to which the task belongs.
   * @returns The updated task.
   */
  @Post('/task/complete')
  async completeTask(@Query('id') id: string, @Query('userName') userName: string, @Query('groupId') groupId: string) {
    return await this.toDoService.completeTask(id, userName, groupId);
  }

  /**
   * Endpoint to get tasks for a user.
   * @param userName The username of the user.
   * @returns The tasks assigned to the user.
   */
  @Get('/task')
  async getTasks(@Query('userName') userName: string) {
    return await this.toDoService.getTasks(userName);
  }
}
