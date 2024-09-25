import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CriarUsuarioDto } from './DTO/criar-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(private readonly dbService: DatabaseService) {}

  async insert(criarUsuarioDto: CriarUsuarioDto): Promise<string>{
    //TODO: Criptografar senha
    const sql = 'INSERT INTO USUARIO (NOME, EMAIL, SENHA) VALUES ($1, $2, $3)';
    try {
      await this.dbService.query(sql, [criarUsuarioDto.nome, criarUsuarioDto.email, criarUsuarioDto.senha]);
    } catch (error) {
      throw new InternalServerErrorException('Erro ao inserir usuário' + error);
    }

    let usuario_id : string;
    try {
      usuario_id = (await this.dbService.query('SELECT * FROM USUARIO WHERE EMAIL = $1', [criarUsuarioDto.email])).rows[0].USUARIO_ID;
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar dados do usuário' + error);
    }
    
    return usuario_id;
  }

  async findById(usuario_id: number): Promise<string>{
    const sql = 'SELECT USUARIO_ID, NOME, EMAIL, URL_GOOGLE FROM USUARIO WHERE USUARIO_ID = $1';
    let usuario;
    try {
      usuario = (await this.dbService.query(sql, [usuario_id])).rows[0];
    } catch (error) {
      throw new InternalServerErrorException('Erro ao buscar dados do usuário' + error);
    }
    
    return usuario;
  }
}