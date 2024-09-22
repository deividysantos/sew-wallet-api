import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  private pool: Pool;

  constructor(private configService: ConfigService) {
    this.pool = new Pool({
      user: this.configService.get<string>('DATABASE_USER'),
      host: this.configService.get<string>('DATABASE_HOST'),
      database: this.configService.get<string>('DATABASE_NAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      port: this.configService.get<number>('DATABASE_PORT'),
    });
  }

  async query(query: string, params?: any[]): Promise<any> {
    return this.pool.query(query, params);
  }
}
