import { Injectable } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class PessoaService {
  constructor(
    @InjectModel(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
  ) {}
  enviarFoto(foto) {}

  cadastrarPessoa(pessoa) {
    try {
      this.pessoaRepository.create(pessoa);
      return {
        messagem: 'pessoa cadastrada com sucesso',
        dados: pessoa,
      };
    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }
}
