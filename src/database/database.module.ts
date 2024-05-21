import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from 'src/partners/entities/partner.entity';
@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql_db',
      port: 3307,
      database: 'invoices_db',
      entities: [Partner],
      username: 'testuser',
      password: 'testuser123',
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
