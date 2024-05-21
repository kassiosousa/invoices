import { Injectable } from '@nestjs/common';
import { Partner } from './entities/partner.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PartnerDto } from './dto/partner.dto';

@Injectable()
export class PartnersService {
  constructor(
    @InjectRepository(Partner)
    private readonly partnerRepository: Repository<Partner>,
  ) {}

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
