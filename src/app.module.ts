import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Usuario } from './usuario/entities/usuario.entity';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: 'spy_cam',
      models: [Usuario],
    }),
    UsuarioModule,
  ],
})
export class AppModule {}
