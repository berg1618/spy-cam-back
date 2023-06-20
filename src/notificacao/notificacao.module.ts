import { Module } from '@nestjs/common';
import { Notificacao } from './entities/notificacao.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({ imports: [SequelizeModule.forFeature([Notificacao])] })
export class NotificacaoModule {}
