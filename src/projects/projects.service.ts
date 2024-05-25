import { Inject, Injectable } from '@nestjs/common';
import { Project } from './domain/entities/project.entity';
import { ProjectDto } from './dto/project.dto';
import { IPartnerRepository } from 'src/partners/domain/interfaces/partner.repository.interface';
import { ProjectPartnersDto } from './dto/project-partners.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartnerProject } from 'src/partners/domain/entities/partner-project.entity';
import { Partner } from 'src/partners/domain/entities/partner.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @InjectRepository(PartnerProject)
    private readonly partnerProjectRepository: Repository<PartnerProject>,
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

  async create(project: ProjectPartnersDto) {
    try {
      let newProject = new ProjectDto();
      newProject = {
        name: project.name,
        description: project.description,
        stores: project.stores,
        dateStart: project.dateStart,
        dateReleased: project.dateReleased,
      };
      console.log(newProject);
      const projectCreated: Project =
        await this.projectRepository.save(newProject);

      if (projectCreated && project.partners.length > 0) {
        project.partners.forEach(async (partner) => {
          const partnerLoaded: Partner = await this.partnerRepository.findOne({
            where: {
              id: partner,
            },
          });
          console.log(partnerLoaded);
          if (partnerLoaded) {
            const projectParner: PartnerProject = {
              partnerId: partnerLoaded.id,
              projectId: projectCreated.id,
            };
            this.partnerProjectRepository.save(projectParner);
          }
        });
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  findAll(): Promise<Project[]> {
    return this.projectRepository.find();
  }

  findOne(id: number): Promise<Project | null> {
    return this.projectRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async removePartnerProject(partnerId: string, projectId: string) {
    throw new Error('Method not implemented.');
  }
}
