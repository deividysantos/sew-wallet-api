import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { ContaService } from './conta.service';
import { ContaController } from './conta.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [ContaService, DatabaseService],
  controllers: [ContaController],
})
export class ContaModule {}
