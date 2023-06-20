import {
    Body,
    Controller,
    Post,

} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { NotificacaoService } from './notificacao.service';

@Controller('notficacaos')
export class NotificacaoController {
    constructor(private notificacaoService: NotificacaoService) { }

    @Public()
    @Post('/cadastro')
    async CadastrarNotificacao(
        @Body() notificacao
    ): Promise<any> {
        this.notificacaoService.cadastrarNotificacao(notificacao);
    }
}

