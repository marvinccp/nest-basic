import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create.task.dto';
import { UpdateTaskDto } from './dto/update.task.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  // tasks = [
  //   { id: 1, task: 'Create project' },
  //   { id: 2, task: 'Eat Burguer' },
  // ];

  getTasks() {
    return this.prisma.tasks.findMany();
  }

  // getOne(id: string) {
  //   const taskId = parseInt(id, 10);
  //   const task = this.tasks.find((t) => t.id === taskId);
  //   //error
  //   if(!task)  new NotFoundException(`task id ${id} not foud`)
  //   //esta es una forma de pasar un mensaje de error
  //   return task ? task : { error: 'Not Found' };
  // }

  async getOne(id: string): Promise<CreateTaskDto> {
    try {
      const task = await this.prisma.tasks.findUnique({
        where: { id },
      });
      return task;
    } catch (error) {
      throw new NotFoundException(` task with ID ${id} not found`);
    }
  }

  // createNewTask(task:CreateTaskDto ) {
  //   const newTask = task;
  //   this.tasks.push({
  //     id: this.tasks.length + 1,
  //     ...task,
  //   });
  //   return newTask;
  // }

  async create(userId: string, task: CreateTaskDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }
    return this.prisma.tasks.create({
      data: {
        ...task,
        userId: userId,
      },
    });
  }

  // updateTask(id: string, task: UpdateTaskDto) {
  //   const taskId = parseInt(id);
  //   const updateTask = this.tasks.find((task) => taskId === task.id);
  // }

  async updateTask(id: string, task: UpdateTaskDto): Promise<CreateTaskDto> {
    const updateTask = await this.prisma.tasks.findUnique({ where: { id } });

    if (!updateTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return this.prisma.tasks.update({
      where: { id },
      data: task,
    });
  }

  async deleteTask(id: string): Promise<string> {
    const task = await this.prisma.tasks.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    await this.prisma.tasks.delete({
      where: { id },
    });
    return `Task with ID ${id} has been deleted`;
  }
}
