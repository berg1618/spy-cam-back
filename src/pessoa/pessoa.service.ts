import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { Usuario_Pessoa } from '../usuario_pessoa/entities/usuario_pessoa.entity';

@Injectable()
export class PessoaService {
  constructor(
    @InjectModel(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
    @InjectModel(Usuario_Pessoa)
    private usuarioPessoaRepository: Repository<Usuario_Pessoa>,
  ) {}

  async cadastrarPessoa(pessoa, fotos, usuario) {
    try {
      const dados = { nome_pessoa: pessoa['nome_pessoa'], fotos: fotos };

      const criado = await this.pessoaRepository.create(dados);

      this.usuarioPessoaRepository.create({
        id_pessoa: criado.id,
        id_usuario: usuario.sub,
      });

      return {
        msg: 'pessoa cadastrada com sucesso',
      };
    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }
}
