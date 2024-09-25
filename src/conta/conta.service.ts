import { Injectable } from "@nestjs/common";
import { DatabaseService } from "src/database/database.service";
import { CriarContaDTO } from "./DTO/criar-conta.dto";
import { InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class ContaService{
    constructor(private readonly dbService: DatabaseService) {}

    async insert(criarContaDto : CriarContaDTO) : Promise<string>{
        const sql = 'INSERT INTO CONTA (BANCO_ID, USUARIO_ID, NOME) VALUES ($1, $2, $3)'

        try {
            await this.dbService.query(sql, [criarContaDto.banco_id, criarContaDto.usuario_id, criarContaDto.nome]);
        } catch (error) {
            throw new InternalServerErrorException('Erro ao inserir conta' + error);
        }

        let conta_id : string;
        try {
            const sqlBuscaConta = 'SELECT * FROM CONTA C WHERE C.NOME = $1 AND C.USUARIO_ID = $2';
            conta_id = (await this.dbService.query(sqlBuscaConta, [criarContaDto.nome, criarContaDto.usuario_id])).rows[0].CONTA_ID;
        } catch (error) {
          throw new InternalServerErrorException('Erro ao buscar dados do usuário' + error);
        }
        
        return conta_id;
    }

    async contasPorUsuario(usuario_id: string): Promise<string> {
        const sql = 'SELECT * FROM CONTA WHERE USUARIO_ID = $1';
        let contas;
        try {
            contas = (await this.dbService.query(sql, [usuario_id])).rows[0];
        } catch (error) {
            throw new InternalServerErrorException('Erro ao buscar dados do usuário' + error);
        }

        return contas;
    }
}