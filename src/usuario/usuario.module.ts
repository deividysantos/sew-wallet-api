import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseService } from '../database/database.service';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [UsuarioService, DatabaseService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
