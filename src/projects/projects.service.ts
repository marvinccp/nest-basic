import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-projects.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateProjectDto } from './dto/update-projects.dto';

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

  getProjects() {
    return this.prisma.projects.findMany({
      include: {
        tasks: true,
      },
    });
  }

  async getProject(id: string): Promise<CreateProjectDto> {
    try {
      const project = await this.prisma.projects.findUnique({
        where: {
          id: id,
        },
        include: {
          tasks: true,
        },
      });
      return project;
    } catch (error) {
      throw new NotFoundException(` project with ID ${id} not found`);
    }
  }

  async updateProject(
    id: string,
    project: UpdateProjectDto
  ): Promise<CreateProjectDto> {
    const projectToUpdate = await this.getProject(id);
    if (!projectToUpdate) {
      throw new NotFoundException(`project with ID ${id} not found`);
    }

    return this.prisma.projects.update({
      where: {
        id: id,
      },
      data: project,
    });
  }
}
