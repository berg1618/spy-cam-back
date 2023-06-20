import { Module } from '@nestjs/common';
import { Notificacao } from './entities/notificacao.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificacaoService } from './notificacao.service';
import { NotificacaoController } from './notificacao.controller';

@Module({
    imports: [SequelizeModule.forFeature([Notificacao])],
    providers: [NotificacaoService],
    controllers: [NotificacaoController],
})
export class NotificacaoModule { }
