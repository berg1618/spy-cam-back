import { Body, Controller, Post } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './entities/pessoa.entity';

@Controller('pessoa')
export class PessoaController {
  constructor(private pessoaService: PessoaService) {}

  @Post()
  async cadastrarPessoa(@Body() pessoa: Pessoa) {
    this.pessoaService.cadastrarPessoa(pessoa);
  }
}
