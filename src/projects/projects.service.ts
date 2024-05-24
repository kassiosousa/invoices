import { Inject, Injectable } from '@nestjs/common';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDto } from './dto/project.dto';
import { IPartnerRepository } from 'src/partners/domain/interfaces/partner.repository.interface';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
    @Inject('PartnerRepository')
    private readonly partnerRepository: IPartnerRepository,
  ) {}

  async exampleMethod(): Promise<void> {
    const partners = await this.partnerRepository.getAllPartners();
    console.log(partners);
  }

  async create(project: ProjectDto) {
    const projectCreated = await this.projectRepository.save(project);
    if (projectCreated) {
      return projectCreated;
    } else {
      return false;
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
}
