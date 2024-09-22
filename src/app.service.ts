import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly dbService: DatabaseService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async getAllUsers(): Promise<any> {
    const result = await this.dbService.query('SELECT * FROM USERS');
    return result.rows;
  }

}
