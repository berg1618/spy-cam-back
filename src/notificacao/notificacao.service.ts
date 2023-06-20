import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { Notificacao } from './entities/notificacao.entity';

@Injectable()
export class NotificacaoService {
    constructor(
        @InjectModel(Notificacao)
        private notificacaoRepository: Repository<Notificacao>,
    ) { }

    async cadastrarNotificacao(dados) {
        try {
            this.notificacaoRepository.create(dados);

            return {
                msg: 'registrado com sucesso',
            };
        } catch (err) {
            throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
        }
    }
}
