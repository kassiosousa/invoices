import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerDto } from './dto/partner.dto';
import { Partner } from './domain/entities/partner.entity';
import { PartnerProject } from './domain/entities/partner-project.entity';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
    @InjectRepository(PartnerProject)
    private readonly partnerProjectRepository: Repository<PartnerProject>,
  ) {}

  async createPartnerProject(createPartnerProject: {
    partnerId: number;
    projectId: number;
  }): Promise<void> {
    const partner = await this.partnerRepository.findOne({
      where: { id: createPartnerProject.partnerId },
    });
    if (!partner) {
      throw new NotFoundException();
    }
    /* You can check if course with given ID exists aswell here in the same way with CourseRepository */
    await this.partnerProjectRepository.save(createPartnerProject);
  }

  async create(partner: PartnerDto) {
    const newPartner = this.partnerRepository.create({
      ...partner,
    });
    const partnerCreated = await this.partnerRepository.save(newPartner);
    if (partnerCreated) {
      return partnerCreated;
    } else {
      return false;
    }
  }

  findAll(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  findOne(id: number): Promise<Partner | null> {
    return this.partnerRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    await this.partnerRepository.delete(id);
  }
}
