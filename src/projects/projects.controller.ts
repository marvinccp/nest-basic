import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-projects.dto';
import { ProjectsService } from './projects.service';
import { UpdateProjectDto } from './dto/update-projects.dto';

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
    const userId = body.userId;
    return this.projectService.createProject(userId, body);
  }
  @Patch('/:id')
  @UsePipes(new ValidationPipe())
  updateProject(@Param('id') id: string, @Body() body: UpdateProjectDto) {
    return this.projectService.updateProject(id, body);
  }
}
