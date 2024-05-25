import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerDto } from './dto/partner.dto';
import { Partner } from './domain/entities/partner.entity';
import { PartnerProject } from './domain/entities/partner-project.entity';
import { IPartnerRepository } from './domain/interfaces/partner.repository.interface';
import { Project } from 'src/projects/domain/entities/project.entity';

@Injectable()
export class PartnersService implements IPartnerRepository {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    @InjectRepository(PartnerProject)
    private readonly partnerProjectRepository: Repository<PartnerProject>,
  ) {}

  async create(partner: PartnerDto): Promise<Partner> {
    const newPartner = this.partnerRepository.create({
      ...partner,
    });
    const partnerCreated = await this.partnerRepository.save(newPartner);
    if (partnerCreated) {
      return partnerCreated;
    } else {
      return null;
    }
  }

  async createPartnerProject(
    partnerID: number,
    projectID: number,
  ): Promise<Partner> {
    const partner = await this.findOne(partnerID);
    if (!partner) {
      throw new NotFoundException();
    } else {
      const newParterProject: PartnerProject = {
        partnerId: projectID,
        projectId: projectID,
      };
      await this.partnerProjectRepository.save(newParterProject);
    }
    return partner;
  }

  findAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  findOne(id: number): Promise<Partner | null> {
    return this.partnerRepository.findOneBy({ id });
  }

  findByProject(project: Project): Promise<Partner[]> {
    throw new Error('Method not implemented.');
  }
  findByEmail(email: string): Promise<Partner[]> {
    throw new Error('Method not implemented.');
  }

  async remove(id: number): Promise<void> {
    await this.partnerRepository.delete(id);
  }
}
