import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
})
export class UsuarioModule {}
