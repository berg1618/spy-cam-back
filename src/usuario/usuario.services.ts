import { Repository } from 'sequelize-typescript';
import { Usuario } from './entities/usuario.entity';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcryptjs';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectModel(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async login(userEmail): Promise<Usuario | undefined> {
    try {
      return await this.usuarioRepository.findOne({
        where: { email: userEmail },
      });
    } catch (err) {
      throw new UnprocessableEntityException(`Acesso negado. ${err.message}`);
    }
  }
  async cadastrarUser(user) {
    try {
      user.senha = await bcrypt.hash(user.senha, 8);
      await this.usuarioRepository.create(user);

    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }

  async userExists(user) {
    try {
      const userExists = await this.usuarioRepository.findOne({
        where: { email: user.email },
      });
      console.log(userExists);
      return userExists;
    } catch (err) {
      throw new Error(`não foi posível realizar a operacao ${err.message}`);
    }
  }
}
