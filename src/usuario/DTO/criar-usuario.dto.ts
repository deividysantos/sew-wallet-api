import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class CriarUsuarioDto {
  @IsString({message: 'O nome deve ser uma string.'})
  @IsNotEmpty({message: 'O nome é obrigatório.'})
  nome: string;

  @IsEmail({}, {message: 'O email deve ser válido.'})
  @IsNotEmpty({message: 'O email é obrigatório.'})
  email: string;

  @IsString(({message: 'A senha deve ser uma string.'}))
  @IsNotEmpty({message: 'A senha é obrigatória.'})
  senha: string;
}
