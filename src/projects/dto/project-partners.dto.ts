import { Partner } from 'src/partners/domain/entities/partner.entity';

export class ProjectPartnersDto {
  name: string;
  description: string;
  stores: string;
  dateStart: Date;
  dateReleased: Date;
  partners: Partner[];
}
