import { Partner } from 'src/partners/domain/entities/partner.entity';
import { IPartnerRepository } from 'src/partners/domain/interfaces/partner.repository.interface';
import { Project } from 'src/projects/entities/project.entity';
import { Repository } from 'typeorm';

export class PartnerRepository
  extends Repository<Partner>
  implements IPartnerRepository
{
  createPartnerProject(partnerID: number, projectID: number): Promise<Project> {
    throw new Error('Method not implemented.');
  }
  findByProject(project: Project): Promise<Partner[]> {
    throw new Error('Method not implemented.');
  }
  createPartner(partner: Partner): Promise<Partner> {
    console.log(partner);
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<Partner[]> {
    console.log(email);
    throw new Error('Method not implemented.');
  }
  async getAllPartners(): Promise<Partner[]> {
    const result = await this.find();
    return result;
  }
}
