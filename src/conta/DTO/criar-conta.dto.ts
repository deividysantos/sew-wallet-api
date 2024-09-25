import { IsString, IsNotEmpty, IsEmail, IsNumber, Length, isNotEmpty } from 'class-validator';

export class CriarContaDTO {
    @IsNumber()
    @IsNotEmpty()
    banco_id: number;

    @IsNumber()
    @IsNotEmpty()
    usuario_id: number;
    
    @IsString()
    @Length(3,20)
    @IsNotEmpty()
    nome: string;
}
