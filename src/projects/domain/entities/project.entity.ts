import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id', unsigned: true })
  id: number;

  @Column('varchar', { name: 'name', length: 255, unique: false })
  name: string;

  @Column('varchar', { name: 'description', length: 255, unique: false })
  description: string;

  @Column('varchar', { name: 'stores', length: 255, unique: false })
  stores: string;

  @Column()
  dateStart: Date;

  @Column()
  dateReleased: Date;

  @Column({ default: true })
  isActive: boolean;
}
