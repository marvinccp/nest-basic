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
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-projects.dto';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-projects.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {
  constructor(private projectService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectService.getProjects();
  }
  @Get('/:id')
  getProject(@Param('id') id: string) {
    return this.projectService.getProject(id);
  }
  @Post()
  createProject(@Body() body: CreateProjectDto) {
    const userIds: string[] | null = body.userId || null;
    const clientId: string = body.clientId
    return this.projectService.createProject(userIds, body, clientId);
  }

  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  updateProject(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectService.updateProject(id, body);
  }

  @Delete('/:id')
  deleteProject(@Param('id') id: string) {
    return this.projectService.deleteProject(id);
  }

  /* Adicionar responsable a un projecto */

  @Post('/adduser')
  adduserToProject(@Body() body: any) {
    const userIds: string[] = body.userId;
    const projectId: string = body.projectId;
    return this.projectService.adduserToProject(userIds, projectId);
  }
}
