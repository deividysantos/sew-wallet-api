import { Body, Controller, Post, Get, Res, Param } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from './usuario.service';
import { CriarUsuarioDto } from './DTO/criar-usuario.dto';
import { Response } from 'express';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService, 
              private configService: ConfigService
  ) {}
  
  @Post()
  async create(@Body() criarUsuarioDTO: CriarUsuarioDto, @Res() res: Response) {
    
    const usuario_id = await this.usuarioService.insert(criarUsuarioDTO);

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      usuario_id: usuario_id,
    });    
  }

  @Get(':usuario_id')
  async find(@Param('usuario_id') usuario_id: number, @Res() res: Response) {
    
    const usuario = await this.usuarioService.findById(usuario_id);

    return res.status(200).json({
      usuario: usuario,
    });
  }
}