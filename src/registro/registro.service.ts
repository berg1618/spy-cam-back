import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { Registro } from './entities/registro.entity';

@Injectable()
export class RegistroService {
  constructor(
    @InjectModel(Registro)
    private registroRepository: Repository<Registro>,
  ) {}

  async cadastrarRegistro(dados) {
    try {
      await this.registroRepository.create(dados);

      return {
        msg: 'registrado com sucesso',
      };
    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }

  async listarRegistros() {
    try {
      const registros = await this.registroRepository.findAll({
        order: [['createdAt', 'DESC']],
      });
      return registros;
    } catch (err) {
      throw new Error(`não foi posível encontrar nada. ${err.message}`);
    }
  }

  async listarUltimoRegistro() {
    try {
      const registro = await this.registroRepository.findAll({
        limit: 1,
        order: [['createdAt', 'DESC']],
        where: {
          enviado: 1,
        },
      });

      return registro;
    } catch (err) {
      throw new Error(`não foi posível encontrar nada. ${err.message}`);
    }
  }

  async atualizarRegistro() {
    const registro = await this.registroRepository.findOne({
      limit: 1,
      order: [['createdAt', 'DESC']],
    });

    await this.registroRepository.update(
      { enviado: 0 },
      {
        where: {
          id: registro.id,
        },
      },
    );
  }
}
