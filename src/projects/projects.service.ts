import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-projects.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateProjectDto } from './dto/update-projects.dto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async createProject(userIds: string[] | null, projectDTO: CreateProjectDto, clientId:string) {
    const { project, time, title, active, postalCode, address } = projectDTO;
    const projectData: any = { project, time, title, active, clientId, postalCode, address };
    console.log(userIds);
    if (userIds && userIds.length > 0) {
      projectData.users = {
        connect: userIds.map((userId) => ({ id: userId })),
      };
    }

    try {
      return this.prisma.projects.create({
        data: projectData,
        include: { users: true },
      });
    } catch (error) {
      throw new Error(`Error creating project: ${error.message}`);
    }
  }

  getProjects() {
    return this.prisma.projects.findMany({
      include: {
        tasks: true,
        users: true,
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
          users: true,
        },
      });
      const userIds = project.users.map((user) => user.id);
      console.log(project);

      return {
        ...project,
        userId: userIds,
      };
    } catch (error) {
      throw new NotFoundException(` project with ID ${id} not found`);
    }
  }

  async updateProject(
    id: string,
    project: UpdateProjectDto,
  ): Promise<CreateProjectDto> {
    const projectToUpdate = await this.getProject(id);
    if (!projectToUpdate) {
      throw new NotFoundException(`project with ID ${id} not found`);
    }

    const updatedProject = await this.prisma.projects.update({
      where: {
        id: id,
      },
      data: {
        project: project.project,
        time: project.time,
      },
      include: {
        tasks: true,
        users: true,
      },
    });

    const userIds = updatedProject.users.map((user) => user.id);

    return {
      project: updatedProject.project,
      time: updatedProject.time,
      userId: userIds,
      title:updatedProject.title,
      active:updatedProject.active,
      clientId:updatedProject.clientId,
      postalCode:updatedProject.postalCode,
      address:updatedProject.address
    };
  }

  async deleteProject(id: string): Promise<void> {
    console.log(id);
    const project = await this.getProject(id);
    console.log(project);
    if (!project) {
      throw new NotFoundException(`project with ID ${id} not found`);
    }
    await this.prisma.projects.delete({
      where: {
        id: id,
      },
    });
  }

  async adduserToProject(userIds: string[], projectId: string) {
    // const user = await this.prisma.user.findUnique({
    //   where: {
    //     id: userId,
    //   },
    // });
    // if (!user) {
    //   throw new NotFoundException(`User with ID ${userId} not found`);
    // }
    console.log(userIds);
    const project = await this.prisma.projects.findUnique({
      where: {
        id: projectId,
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
    }

    const usersToAdd = userIds.map((userId) => ({ id: userId }));
    return this.prisma.projects.update({
      where: {
        id: projectId,
      },
      data: {
        users: {
          connect: usersToAdd,
        },
      },
    });
  }
}
