import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Pessoa } from './entities/pessoa.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Repository } from 'sequelize-typescript';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Injectable()
export class PessoaService {
  constructor(
    @InjectModel(Pessoa)
    private pessoaRepository: Repository<Pessoa>,
  ) {}
  async enviarFoto(fotos) {
    const storage = diskStorage({
      destination: './arquivos/pessoas',
      filename: (req, fotos, cb) => {
        const randomName = Array(32)
          .fill(null)
          .map(() => Math.round(Math.random() * 16).toString(16))
          .join('');

        cb(null, `${randomName}${extname(fotos.originalname)}`);
      },
    });
    return await fotos.path;
  }

  async cadastrarPessoa(pessoa, fotos) {
    try {
      const caminho = await this.enviarFoto(fotos);

      const dados = { pessoa, fotos: caminho };
      this.pessoaRepository.create(dados);
      return {
        messagem: 'pessoa cadastrada com sucesso',
        dados: pessoa,
      };
    } catch (err) {
      throw new Error(`não foi posível realizar o cadastro. ${err.message}`);
    }
  }
}
