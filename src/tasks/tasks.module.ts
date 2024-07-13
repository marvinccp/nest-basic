import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TaskService } from './tasks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TasksController],
  providers: [TaskService, PrismaService],
})
export class TaskModule {}
