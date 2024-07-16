import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dto/create-projects.dto';
import { ProjectsService } from './projects.service';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {

    constructor(private projectService: ProjectsService) {}


    @Get()
    getProjects() {
        return 'Get projects';
    }
    @Get(':id')
    getProject() {
        return 'Get project';
    }
    @Post()
     createProject(@Body() body:CreateProjectDto) {
       return this.projectService.createProject(body) 
    }

}
