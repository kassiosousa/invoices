import { Partner } from 'src/partners/domain/entities/partner.entity';
import { Project } from 'src/projects/entities/project.entity';

export interface IProjectRepository {
  createPartnersProject(project: Project, partner: Partner[]): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
}
