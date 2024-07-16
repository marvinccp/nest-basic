import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-projects.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(userId: string, project: CreateProjectDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return this.prisma.projects.create({
      data: project,
    });
  }
}
