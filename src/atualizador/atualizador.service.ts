import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class AtualizadorService {
  constructor(private readonly dbService: DatabaseService) {}

  async atualizarBancoDeDados(versao?: number, instrucao?: number): Promise<any> {

    if (!versao) {
        versao = (await this.dbService.query('SELECT MAX(VERSAO) FROM INSTRUCAO')).rows[0].max;
    }    
    
    try {
        let rows = (await this.dbService.query(`SELECT * 
                                                  FROM INSTRUCAO I 
                                                 WHERE I.EXECUTADA = 'N'
                                                   AND I.VERSAO <= $1 
                                                   AND ((I.INSTRUCAO <= $2) OR ($2 = 0))
                                                 ORDER BY I.INSTRUCAO`, [versao, instrucao ? instrucao : 0])).rows;

        let instrucoes = [];
        rows.forEach((row) => {
            instrucoes.push([row.texto_sql, []]);
            instrucoes.push([`UPDATE INSTRUCAO I SET EXECUTADA = 'S' WHERE I.INSTRUCAO_ID = $1`, [row.instrucao_id]]);
        });

        return this.dbService.execInTransaction(instrucoes);
        
    } catch (error) {
        throw error;
    }

  }

  private async insereInstrucao(params: any[]): Promise<void> {
    await this.dbService.query('INSERT INTO INSTRUCAO (DESCRICAO, TEXTO_SQL, VERSAO, INSTRUCAO) VALUES ($1, $2, $3, $4)', params);
  }

  private async versaoCadastrada(versao: number): Promise<boolean> {
    const rows = await (await this.dbService.query('SELECT MAX(INSTRUCAO_ID) FROM INSTRUCAO WHERE VERSAO = $1', [versao])).rows;

    return rows[0].max > 0;
  }

  async versao01(): Promise<String> {
    
    if (await this.versaoCadastrada(1))
        return;

    try {        
        await this.insereInstrucao([
            'Criação da tabela USUARIO',
            `CREATE TABLE USUARIO (
                USUARIO_ID SERIAL PRIMARY KEY,
                NOME VARCHAR(100),
                SENHA VARCHAR(12),
                URL_GOOGLE VARCHAR(1000)
            )`, 1, 1
        ]);

        await this.insereInstrucao([
            'Criação da tabela BANCO',
            `CREATE TABLE BANCO (
                BANCO_ID SERIAL PRIMARY KEY,
                NOME VARCHAR(20)
            )`, 1, 2
        ]);

        await this.insereInstrucao([
            'Criação da tabela CONTA',
            `CREATE TABLE CONTA (
                CONTA_ID SERIAL PRIMARY KEY,
                BANCO_ID INTEGER,
                USUARIO_ID INTEGER,
                NOME VARCHAR(20),
                CONSTRAINT FK_CONTA_BANCO FOREIGN KEY (BANCO_ID) REFERENCES BANCO(BANCO_ID),
                CONSTRAINT FK_CONTA_USUARIO FOREIGN KEY (USUARIO_ID) REFERENCES USUARIO(USUARIO_ID)
                )`, 1, 3
        ]);

        await this.insereInstrucao([
            'Criação da tabela CATEGORIA',
            `CREATE TABLE CATEGORIA (
                CATEGORIA_ID SERIAL PRIMARY KEY,
                USUARIO_ID INTEGER,
                NOME VARCHAR(20),
                CONSTRAINT FK_CATEGORIA_USUARIO FOREIGN KEY (USUARIO_ID) REFERENCES USUARIO(USUARIO_ID)
                )`, 1, 4
        ]);

        await this.insereInstrucao([
            'Criação da tabela LANCAMENTO',
            `CREATE TABLE LANCAMENTO (
                LANCAMENTO_ID SERIAL PRIMARY KEY,
                CONTA_ID INTEGER,
                CATEGORIA_ID INTEGER,
                TITULO VARCHAR(100),
                DESCRICAO VARCHAR(1000),
                VALOR NUMERIC(15,2),
                DATA DATE,
                CONSTRAINT FK_LANCAMENTO_CONTA FOREIGN KEY (CONTA_ID) REFERENCES CONTA(CONTA_ID),
                CONSTRAINT FK_LANCAMENTO_CATEGORIA FOREIGN KEY (CATEGORIA_ID) REFERENCES CATEGORIA(CATEGORIA_ID)
                )`, 1, 5
        ]);

    } catch (error) {
        return `Erro durante a atualização: ${error.message}`; 
    }
  }

  async versao02(): Promise<String> {
    if (await this.versaoCadastrada(2))
        return;

    
  }
}
