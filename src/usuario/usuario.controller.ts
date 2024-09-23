import { Body, Controller, Post, Get, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsuarioService } from './usuario.service';
import { CreateUserDto } from './DTO/create-user.dto';
import { Response } from 'express';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService, 
              private configService: ConfigService
  ) {}
  
  @Post()
  async create(@Body() createUserDTO: CreateUserDto, @Res() res: Response) {
    
    const usuario_id = await this.usuarioService.insert(createUserDTO);

    return res.status(201).json({
      mensagem: 'Usuário criado com sucesso!',
      usuario_id: usuario_id,
    });    
  }

  @Get(':usuario_id')
  async find(usuario_id: number, @Res() res: Response) {
    
    const usuario = this.usuarioService.findById(usuario_id);

    return res.status(200).json({
      usuario: usuario,
    });
  }
}