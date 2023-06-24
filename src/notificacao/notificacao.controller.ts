import { Body, Controller, Get, Post } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { CreateNotificacaoDto } from './dto/notificacao.dto';
import { NotificacaoService } from './notificacao.service';

@Controller('notificacoes')
export class NotificacaoController {
  constructor(private notificacaoService: NotificacaoService) {}

  @Get()
  async listarRegistro() {
    return this.notificacaoService.listarRegistros();
  }

  @Post('/cadastro')
  async CadastrarNotificacao(
    @Body() notificacao: CreateNotificacaoDto,
  ): Promise<any> {
    return this.notificacaoService.cadastrarNotificacao(notificacao);
  }
}
