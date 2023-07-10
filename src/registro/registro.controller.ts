import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/registro.dto';
import { Observable, concatMap, interval } from 'rxjs';


@Controller('registro')
export class RegistroController {
  constructor(private registroService: RegistroService) {}

  @Public()
  @Get()
  async listarRegistro() {
    return this.registroService.listarRegistros();
  }
  @Public()
  @Post('/cadastro')
  async CadastrarRegistros(@Body() registro: CreateRegistroDto): Promise<any> {
    return this.registroService.cadastrarRegistro(registro);
  }

  async buscar() {
    return this.registroService.listarRegistro();
  }

  @Public()
  @Sse('watch')
  async Notificar(): Promise<Observable<any>> {
    return interval(10000).pipe(
      concatMap(async (_) => {
        const registro = await this.buscar();
        return { data: registro };
      }),
    );
  }
}
