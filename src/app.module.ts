import { Module } from '@nestjs/common';
import { UsuarioModule } from './usuario/usuario.module';
import { SequelizeModule } from '@nestjs/sequelize';
import * as dotenv from 'dotenv';
import { Usuario } from './usuario/entities/usuario.entity';
import { PessoaModule } from './pessoa/pessoa.module';
import { NotificacaoModule } from './notificacao/notificacao.module';
import { Notificacao } from './notificacao/entities/notificacao.entity';
import { Pessoa } from './pessoa/entities/pessoa.entity';
import { AuthModule } from './auth/auth.module';

dotenv.config();

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: parseInt(process.env.DBPORT),
      username: process.env.DBUSER,
      password: process.env.DBPASSWORD,
      database: 'spy_cam',
      models: [Usuario, Pessoa, Notificacao],
      synchronize: true,
      autoLoadModels: true,
    }),
    UsuarioModule,
    PessoaModule,
    NotificacaoModule,
    AuthModule,
  ],
})
export class AppModule {}
