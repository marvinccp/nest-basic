import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TaskService } from './tasks.service';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { ApiTags } from '@nestjs/swagger';
import { StringpipePipe } from 'src/users/pipes/stringpipe/stringpipe.pipe';

@Controller('tasks')
@ApiTags('tasks')
export class TasksController {
  taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  @Get()
  getAllTasks() {
    return this.taskService.getTasks();
  }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string) {
  //   const taskId = parseInt(id, 10);
  //   const task = this.tasks.find((task) => task.id === taskId);
  //   return task ? task : { error: 'Not Found' };
  // }

  @Get('/:id')
  @UsePipes(new ValidationPipe())
  getTaskById(@Param('id') id: string) {
    return this.taskService.getOne(id);
  }

  @Post()
  async createTask(@Body() body: CreateTaskDto) {
    const userId = body.userId
    console.log(body.userId);
    return this.taskService.create(userId, body);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  updateTask(@Param('id') id: string, @Body() body: UpdateTaskDto) {
    return this.taskService.updateTask(id, body);
  }

  @Delete('/:id')
  async deleteTask(@Param('id') id: string) {
    await this.taskService.deleteTask(id);
  }
}
