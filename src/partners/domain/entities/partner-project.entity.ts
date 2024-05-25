import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Partner } from './partner.entity';
import { Project } from 'src/projects/domain/entities/project.entity';

@Entity('partner_project')
export class PartnerProject {
  @PrimaryColumn({ name: 'partner_id' })
  partnerId: number;

  @PrimaryColumn({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => Partner, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'partner_id', referencedColumnName: 'id' }])
  partners?: Partner[];

  @ManyToOne(() => Project, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn([{ name: 'project_id', referencedColumnName: 'id' }])
  projects?: Project[];
}
