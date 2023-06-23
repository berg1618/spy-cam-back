import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario_Pessoa } from './entities/usuario_pessoa.entity';

@Module({
  imports: [SequelizeModule.forFeature([Usuario_Pessoa])],
})
export class UsuarioPessoaModule {}
