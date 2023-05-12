import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Usuario } from './entities/usuario.entity';
import { UsuariosController } from './usuarios.controller';
import { UsuarioService } from './usuarios.services';

@Module({
  imports: [SequelizeModule.forFeature([Usuario])],
  controllers: [UsuariosController],
  providers: [UsuarioService],
})
export class UsuarioModule {}
