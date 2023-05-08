import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class PessoaService {
  constructor(
    @InjectModel(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  async cadastrarPessoa(pessoa, fotos) {
    try {
      const dados = { nome_pessoa: pessoa['nome_pessoa'], fotos: fotos };

      this.pessoaRepository.create(dados);
    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }
}
