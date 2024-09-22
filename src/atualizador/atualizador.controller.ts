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
  getAtualizacao(@Param('cod') codigo: string): string {
    if (codigo != this.configService.get<string>('COD')) {
        return ;
    }

    try{
        this.atualizadorService.versao01();
        this.atualizadorService.versao02();

        return 'Instruções inseridas com sucesso!'
    } catch (error) {
        return 'Erro ao inserir instruções: ' + error;
    }    
    
  }
}
