import { Project } from 'src/projects/entities/project.entity';
import { Partner } from '../entities/partner.entity';

export interface IPartnerRepository {
  createPartner(partner: Partner): Promise<Partner>;
  createPartnerProject(partnerID: number, projectID: number): Promise<Project>;
  findByProject(project: Project): Promise<Partner[]>;
  findByEmail(email: string): Promise<Partner[]>;
  getAllPartners(): Promise<Partner[]>;
}
