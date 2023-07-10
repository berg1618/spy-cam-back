import { Usuario } from './entities/usuario.entity';
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsuarioService } from './usuario.services';
import { Response } from 'express';
import { Public } from '../auth/decorators/public.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarioService: UsuarioService) {}

  @Public()
  @Post('/cadastro')
  async CadastrarPessoa(@Body() usuario, @Res() res?: Response): Promise<any> {
    try {
      if (Object.values(usuario).length == 0) {
        return res.status(400).json({ msg: 'corpo da requisição não pode ser null' })
      }

      if (!usuario.nome || !usuario.email || !usuario.senha) {
        return res.status(400).json({ msg: 'preencha todos os campos' })
      }

      const check = await this.usuarioService.userExists(usuario);

      if (check) {
        return res.status(400).json({ msg: 'esse usuário já existe' });
      }

      this.usuarioService.cadastrarUser(usuario);
      return res.status(201).json({ msg: 'usuario cadastrado' });

    } catch (err) {
      throw new HttpException(
        'erro no servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
