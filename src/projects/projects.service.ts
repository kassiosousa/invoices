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
      const projectCreated: Project =
        await this.projectRepository.save(newProject);

      if (projectCreated && project.partners.length > 0) {
        project.partners.forEach(async (partner) => {
          const partnerLoaded: Partner = await this.partnerRepository.findOne({
            where: {
              id: partner.id,
            },
          });
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

  async findOne(id: number): Promise<ProjectPartnersDto | null> {
    try {
      const project: Project = await this.projectRepository.findOneBy({ id });
      if (project) {
        const partnersProjects: PartnerProject[] =
          await this.partnerProjectRepository.find({
            where: {
              projectId: project.id,
            },
          });
        if (partnersProjects.length > 0) {
          const partnersLoaded: Partner[] = [];
          partnersProjects.forEach(async (element) => {
            await this.partnerRepository
              .findOneBy({ id: element.partnerId })
              .then((result) => {
                partnersLoaded.push(result);
              });
          });
          console.log(partnersLoaded);
          console.log(partnersLoaded.length);
          console.log(partnersLoaded.values);

          let newProjectPartner = new ProjectPartnersDto();
          newProjectPartner = {
            name: project.name,
            description: project.description,
            stores: project.stores,
            dateStart: project.dateStart,
            dateReleased: project.dateReleased,
            partners: partnersLoaded,
          };
          return newProjectPartner;
        } else {
          let projectPartnerLoaded = new ProjectPartnersDto();
          projectPartnerLoaded = {
            name: project.name,
            description: project.description,
            stores: project.stores,
            dateStart: project.dateStart,
            dateReleased: project.dateReleased,
            partners: [],
          };
          return projectPartnerLoaded;
        }
      } else {
        return null;
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }

  async removePartnerProject(partnerId: string, projectId: string) {
    throw new Error('Method not implemented.');
  }
}
