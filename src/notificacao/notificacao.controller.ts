import {
    Body,
    Controller,
    Get,
    Post,

} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateNotificacaoDto } from './dto/notificacao.dto';
import { NotificacaoService } from './notificacao.service';

@Controller('notficacaos')
export class NotificacaoController {
    constructor(private notificacaoService: NotificacaoService) { }

    @Get()
    async listarRegistro() {
        this.notificacaoService.listar()
    }

    @Public()
    @Post('/cadastro')
    async CadastrarNotificacao(
        @Body() notificacao: CreateNotificacaoDto
    ): Promise<any> {
        this.notificacaoService.cadastrarNotificacao(notificacao);
    }
}

