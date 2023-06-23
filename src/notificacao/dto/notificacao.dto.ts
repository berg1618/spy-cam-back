import { IsString, IsNumber } from 'class-validator';

export class CreateNotificacaoDto {
  @IsString()
  mensagem: string;

  @IsNumber()
  pessoa_id;
}
