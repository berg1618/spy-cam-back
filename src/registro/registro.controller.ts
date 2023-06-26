import { Body, Controller, Get, Param, Post, Sse } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/registro.dto';
import { Observable, interval, map } from 'rxjs';

interface MessageEvent {
  data: string | object;
}

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

  @Public()
  @Sse('watch')
  async Notificar(): Promise<Observable<any>> {
    let registro;

    async function buscar() {
      const busca = await this.registroService.listarRegistro();
      if (registro !== busca) {
        registro = busca;
      }
    }
    // return interval(30000).pipe(map(async (_) => (await buscar(); return { data: registro })));
    return interval(30000).pipe(
      map(async (_) => {
        await buscar();
        return { data: registro };
      }),
    );
  }
}
