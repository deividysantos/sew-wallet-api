import { Body, Controller, Param, Get, Post, Res } from "@nestjs/common";
import { ContaService } from "./conta.service";
import { ConfigService } from "@nestjs/config";
import { CriarContaDTO } from "./DTO/criar-conta.dto";
import { Response } from "express";

@Controller('conta')
export class ContaController{
    constructor(private readonly contaService: ContaService,
        private configService: ConfigService
    ) {}

    @Post()
    async create(@Body() criarContaDto: CriarContaDTO, @Res() res: Response) {
        const conta_id =  await this.contaService.insert(criarContaDto);

        return res.status(201).json({
            mensagem: 'Conta criada com sucesso!',
            conta_id: conta_id,
        }); 
    }

    @Get('/usuario/:usuario_id')
    async contaPorUsuario(@Param('usuario_id') usuario_id : string, @Res() res: Response) {
        const contas = await this.contaService.contasPorUsuario(usuario_id);

        return res.status(201).json({
            mensagem: 'Listagem de contas por usuário!',
            contas: contas,
        }); 
    }

}