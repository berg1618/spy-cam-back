import { IsString, IsNumber } from 'class-validator';

export class CreateRegistroDto {
  @IsString()
  mensagem: string;

  @IsNumber()
  pessoa_id;
}
