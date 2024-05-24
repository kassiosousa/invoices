import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/partners/domain/entities/partner.entity';
import { Project } from 'src/projects/entities/project.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'invoices_db',
      entities: [Partner, Project],
      username: 'testuser',
      password: 'testuser123',
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
