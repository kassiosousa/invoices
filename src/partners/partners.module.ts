import { Module } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { PartnersController } from './partners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './domain/entities/partner.entity';
import { PartnerProject } from './domain/entities/partner-project.entity';
import { PartnerRepository } from './infra/db/repositories/partner.repository';
import { Project } from 'src/projects/domain/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Partner, PartnerProject])],
  controllers: [PartnersController],
  providers: [PartnersService, PartnerRepository],
})
export class PartnersModule {}
