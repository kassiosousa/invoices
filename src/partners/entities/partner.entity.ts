import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Partner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  cpf: string;

  @Column()
  cnpjName: string;

  @Column()
  cnpjNumber: number;

  @Column()
  pix: string;

  @Column({ default: true })
  isActive: boolean;
}
