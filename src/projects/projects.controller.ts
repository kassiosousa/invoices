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
import { ProjectPartnersDto } from './dto/project-partners.dto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() createProjectPartnersDto: ProjectPartnersDto) {
    try {
      console.log('### entry project post');
      const projectCreated = await this.projectsService.create(
        createProjectPartnersDto,
      );
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
  findOne(@Param('id') id: number) {
    return this.projectsService.findOne(id);
  }

  @Delete('project-partners/:id')
  removePartnerProject(
    @Param('id') projectId: string,
    @Body() partners: number[],
  ) {
    return projectId + ' ' + partners;
    // return this.projectsService.removePartnerProject(partnerId, projectId);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.projectsService.remove(+id);
  // }
}
