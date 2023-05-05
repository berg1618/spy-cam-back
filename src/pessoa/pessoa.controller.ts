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

@Controller('pessoa')
export class PessoaController {
  constructor(private pessoaService: PessoaService) {}

  @Post()
  @UseInterceptors(FileInterceptor('fotos'))
  async cadastrarPessoa(
    @Body() pessoa: Pessoa,
    @UploadedFile() fotos: Express.Multer.File,
  ) {
    this.pessoaService.cadastrarPessoa(pessoa, fotos);
  }
}
