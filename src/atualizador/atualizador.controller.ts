import { Controller, Get, Param } from '@nestjs/common';
import { AtualizadorService } from './atualizador.service';
import { ConfigService } from '@nestjs/config';

@Controller('atualizador')
export class AtualizadorController {
  constructor(private readonly atualizadorService: AtualizadorService, 
              private configService: ConfigService
  ) {}
  
  @Get()
  async atualizarBanco(): Promise<string> {
    return this.atualizadorService.atualizarBancoDeDados();
  }

  @Get('/insert/:cod')
  async getAtualizacao(@Param('cod') codigo: string): Promise<string> {
    
    if (codigo != this.configService.get<string>('COD')) {
        return ;
    }

    try{
        await this.atualizadorService.versao01();
        await this.atualizadorService.versao02();

        return 'Instruções inseridas com sucesso!'
    } catch (error) {
        return 'Erro ao inserir instruções: ' + error;
    }    
    
  }
}
