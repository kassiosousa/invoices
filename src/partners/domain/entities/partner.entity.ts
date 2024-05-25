import { Project } from 'src/projects/domain/entities/project.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 255, unique: false })
  name: string;

  @Column('varchar', { name: 'email', length: 255, unique: true })
  email: string;

  @Column('varchar', { name: 'phone', length: 255, unique: false })
  phone: string;

  @Column('varchar', {
    name: 'address',
    length: 255,
    unique: false,
    default: null,
  })
  address: string;

  @Column('varchar', { name: 'cpf', length: 255, unique: true })
  cpf: string;

  @Column('varchar', {
    name: 'cnpjName',
    length: 255,
    unique: false,
    default: null,
  })
  cnpjName: string;

  @Column('varchar', {
    name: 'cnpjNumber',
    length: 255,
    unique: false,
    default: null,
  })
  cnpjNumber: number;

  @Column('varchar', { name: 'pix', length: 255, unique: true, default: null })
  pix: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Project, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinTable({
    name: 'partner_project',
    joinColumn: {
      name: 'partner_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'project_id',
      referencedColumnName: 'id',
    },
  })
  projects?: Project[];
}
