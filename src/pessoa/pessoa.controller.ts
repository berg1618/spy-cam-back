import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './entities/pessoa.entity';
import { FilesInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { CurrentUser } from '../usuario/usuario.guard';
import { Public } from '../auth/decorators/public.decorator';

@Controller('pessoa')
export class PessoaController {
  constructor(private pessoaService: PessoaService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('fotos', 5, {
      storage: diskStorage({
        destination: './arquivos/pessoas',

        filename: (req, fotos, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          cb(null, `${randomName}${extname(fotos.originalname)}`);
        },
      }),
    }),
  )
  async cadastrarPessoa(
    @Body() pessoa: Pessoa,
    @UploadedFiles()
    fotos: Array<Express.Multer.File>,
    @CurrentUser('sub') usuario,
  ) {
    let arrayFotos: string = '';

    fotos.forEach((foto) => {
      arrayFotos += foto.path + ';';
    });
    this.pessoaService.cadastrarPessoa(pessoa, arrayFotos, usuario);
  }

  @Public()
  @Get()
  async listarPessoas() {
    return this.pessoaService.listarPessoas();
  }

  @Public()
  @Delete(':pessoa_id')
  async apagarPessoa(@Param() pessoa_id) {
    return this.pessoaService.removerPessoa(pessoa_id);
  }
}
