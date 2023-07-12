import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Res,
  Sse,
} from '@nestjs/common';
import { Public } from '../auth/decorators/public.decorator';
import { RegistroService } from './registro.service';
import { CreateRegistroDto } from './dto/registro.dto';
import { Observable, defer, map, repeat, tap } from 'rxjs';
import { Response } from 'express';

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
  async Notificar(@Res() response: Response): Promise<Observable<any>> {
    return defer(() => this.buscarUltimoRegistro()).pipe(
      repeat({
        delay: 1000,
      }),
      tap((registro) => {
        if (registro['enviado'] === 1) {
          setTimeout(() => {
            response.end();
          }, 1000);
        }
      }),
      map((registro) => ({
        type: 'message',
        data: registro,
      })),
    );
  }
}
