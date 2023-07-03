import { Body, Controller, Get, Post, Sse } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/registro.dto';
import { Observable, concatMap, interval } from 'rxjs';

@Controller('registro')
export class RegistroController {
  constructor(private registroService: RegistroService) { }

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
    let registro;
    const buscar = await this.registroService.listarRegistro();
    if (buscar[0]['enviado'] == false) {
      registro == buscar;
      return { data: registro };
    }
    return { data: '' };

  }

  @Public()
  @Sse('watch')
  async Notificar(): Promise<Observable<any>> {
    return interval(30000).pipe(
      concatMap(async (_) => {
        return { data: await this.buscar() }

      }),
    );
  }
}
