import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { Notificacao } from './entities/notificacao.entity';

@Injectable()
export class NotificacaoService {
  constructor(
    @InjectModel(Notificacao)
    private notificacaoRepository: Repository<Notificacao>,
  ) {}

  async cadastrarNotificacao(dados) {
    try {
      await this.notificacaoRepository.create(dados);

      return {
        msg: 'registrado com sucesso',
      };
    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }

  async listarRegistros() {
    try {
      const registros = await this.notificacaoRepository.findAll();

      return registros;
    } catch (err) {
      throw new Error(`não foi posível encontrar nada. ${err.message}`);
    }
  }
}
