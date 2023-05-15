import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './entities/pessoa.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('pessoa')
export class PessoaController {
  constructor(private pessoaService: PessoaService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('fotos', {
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
    @UploadedFile()
    fotos: Express.Multer.File,
  ) {
    this.pessoaService.cadastrarPessoa(pessoa, fotos.path);
  }
}
