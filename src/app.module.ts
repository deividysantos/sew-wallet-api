import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { ConfigModule } from '@nestjs/config';
import { AtualizadorModule } from './atualizador/atualizador.module';
import { UsuarioModule } from './usuario/usuario.module';
import { ContaModule } from './conta/conta.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AtualizadorModule,
    UsuarioModule,
    ContaModule,
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
