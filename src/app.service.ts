import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  presentationAPI(): string {
    return 'Invoices API - @kassio.romulo';
  }
}
