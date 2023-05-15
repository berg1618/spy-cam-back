import { Repository } from 'sequelize-typescript';
import { Usuario } from './entities/usuario.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async cadastarUser(user) {
    try {
      user.senha = await bcrypt.hash(user.senha, 8);
      await this.usuarioRepository.create(user);
    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }

  // verificar se o usuario q querem cadastrar, ja existe
  async userExists(user) {
    try {
      return await this.usuarioRepository.findOne({
        attributes: ['id', 'nome'],
        where: { nome: user.nome },
      });
    } catch (err) {
      throw new Error(`não foi posível realizar a operacao ${err.message}`);
    }
  }
}
