import { Project } from 'src/projects/domain/entities/project.entity';
import { Partner } from '../entities/partner.entity';

export interface IPartnerRepository {
  create(partner: Partner): Promise<Partner>;
  createPartnerProject(partnerID: number, projectID: number): Promise<Partner>;
  findByProject(project: Project): Promise<Partner[]>;
  findByEmail(email: string): Promise<Partner[]>;
  findOne(id: number): Promise<Partner>;
  findAll(): Promise<Partner[]>;
}
