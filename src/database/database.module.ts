import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartnerProject } from 'src/partners/domain/entities/partner-project.entity';
import { Partner } from 'src/partners/domain/entities/partner.entity';
import { Project } from 'src/projects/domain/entities/project.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'invoices_db',
      entities: [Partner, Project, PartnerProject],
      username: 'testuser',
      password: 'testuser123',
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
