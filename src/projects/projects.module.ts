import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Partner } from 'src/partners/domain/entities/partner.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Partner])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
