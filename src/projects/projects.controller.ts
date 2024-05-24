import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectDto } from './dto/project.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectDto: ProjectDto) {
    try {
      const projectCreated =
        await this.projectsService.create(createProjectDto);
      return projectCreated;
    } catch (error) {
      throw new BadRequestException('can not create a project');
    }
  }

  @Get()
  async findAll() {
    try {
      const projectsAll = await this.projectsService.findAll();
      return projectsAll;
    } catch (error) {
      throw new BadRequestException('can not create a partner');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
