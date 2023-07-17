import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { Usuario_Pessoa } from '../usuario_pessoa/entities/usuario_pessoa.entity';
import * as fs from 'fs';

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

      const usuarioPessoa = await this.usuarioPessoaRepository.create({
        pessoa_id: criado.id,
        usuario_id: usuario,
      });

      return {
        msg: 'pessoa cadastrada com sucesso',
      };
    } catch (err) {
      throw new UnauthorizedException('É necessário estar logado');
    }
  }

  async listarPessoas() {
    try {
      const pessoas = await this.pessoaRepository.findAll();
      return {
        dados: pessoas,
      };
    } catch (err) {
      throw new Error(`não foi posível listar ${err.message}`);
    }
  }

  async removerPessoa(pessoa_id) {
    try {
      const dados = JSON.stringify(pessoa_id);
      const regex = '[0-9]+';

      const id = dados.match(regex);

      const pessoa = await this.pessoaRepository.findOne({
        where: { id: id },
      });

      try {
        const caminho = pessoa.fotos.slice(0, -1);

        fs.unlinkSync(caminho);
        console.log('File removed:', caminho);
      } catch (err) {
        console.error(err);
      }

      await this.usuarioPessoaRepository.update(
        {
          pessoa_id: null,
        },
        { where: { pessoa_id: id } },
      );

      await this.pessoaRepository.destroy({
        where: { id: id },
        cascade: true,
      });

      return {
        dados: 'removido com sucesso',
      };
    } catch (err) {
      throw new Error(`não foi posível remover ${err.message}`);
    }
  }
}
