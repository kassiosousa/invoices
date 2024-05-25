import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './domain/entities/project.entity';
import { Partner } from 'src/partners/domain/entities/partner.entity';
import { PartnerProject } from 'src/partners/domain/entities/partner-project.entity';
import { PartnersService } from 'src/partners/partners.service';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Partner, PartnerProject])],
  controllers: [ProjectsController],
  providers: [ProjectsService, PartnersService],
})
export class ProjectsModule {}
