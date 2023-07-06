import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Sse,
} from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
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
  async cadastrarRegistros(@Body() registro: CreateRegistroDto): Promise<any> {
    return this.registroService.cadastrarRegistro(registro);
  }

  @Public()
  @Patch(':registro_id')
  async atualizarRegistro(@Param() registro_id) {
    await this.registroService.atualizarRegistro(registro_id);
  }

  async buscarUltimoRegistro() {
    const registro = await this.registroService.listarUltimoRegistro();
    return { data: registro };
  }

  @Public()
  @Sse('watch')
  async Notificar(): Promise<Observable<any>> {
    return interval(30000).pipe(
      concatMap(async (_) => {
        return { data: await this.buscarUltimoRegistro() };
      }),
    );
  }
}
