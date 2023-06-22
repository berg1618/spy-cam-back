import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { CreateNotificacaoDto } from './dto/notificacao.dto';
import { Notificacao } from './entities/notificacao.entity';

@Injectable()
export class NotificacaoService {
    constructor(
        @InjectModel(Notificacao)
        private notificacaoRepository: Repository<Notificacao>,
    ) { }

    async cadastrarNotificacao(dados: CreateNotificacaoDto) {
        try {
            this.notificacaoRepository.create({ dados });

            return {
                msg: 'registrado com sucesso',
            };
        } catch (err) {
            throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
        }
    }

    async listar() {
        try {
            const registros = this.notificacaoRepository.findAll();

            return {
                msg: 'retornado com sucesso',
                data: registros
            };
        } catch (err) {
            throw new Error(`não foi posível encontrar nada. ${err.message}`);
        }
    }
}
