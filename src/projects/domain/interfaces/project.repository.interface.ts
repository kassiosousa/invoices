import { Partner } from 'src/partners/domain/entities/partner.entity';
import { Project } from 'src/projects/domain/entities/project.entity';
import { ProjectDto } from 'src/projects/dto/project.dto';

export interface IProjectRepository {
  create(project: ProjectDto, partners: number[]): Promise<Project[]>;
  createPartnersProject(project: Project, partner: Partner[]): Promise<Project>;
  findOne(id: number): Promise<Project>;
  findAll(): Promise<Project[]>;
}
