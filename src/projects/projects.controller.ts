import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('projects')
@ApiTags('projects')
export class ProjectsController {}
