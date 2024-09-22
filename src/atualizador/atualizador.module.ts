import { Module } from '@nestjs/common';
import { AtualizadorService } from './atualizador.service';
import { AtualizadorController } from './atualizador.controller';
import { DatabaseService } from '../database/database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AtualizadorService, DatabaseService],
  controllers: [AtualizadorController],
})
export class AtualizadorModule {}
