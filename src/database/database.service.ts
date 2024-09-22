import { Injectable } from '@nestjs/common';
import { Pool, Client } from 'pg';
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

  async execInTransaction(queries: Array<[string, any[]]>): Promise<any> {
    

    const client = await this.pool.connect();
    try {

      await client.query('BEGIN');

      queries.forEach(async (query) => {
        await client.query(query[0], query[1]);        
        
      });

      await client.query('COMMIT');
    } catch (error) {

      await client.query('BOLLBACK');
      throw error;

    } finally {
      client.release();
    }
  }
}
