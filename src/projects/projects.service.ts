import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-projects.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {


constructor (private prisma: PrismaService){}

  createProject(project: CreateProjectDto) {
    return this.prisma.projects.create({
      data: project,
    });
  }
}
