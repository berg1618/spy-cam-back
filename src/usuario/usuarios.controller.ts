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
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarioService: UsuarioService) {}

  @Public()
  @Post('/cadastro')
  async cadastrarPessoa(@Body() usuario, @Res() res: Response): Promise<any> {
    try {
      if (Object.values(usuario).length == 0) {
        return <any>(
          res.status(400).json({ msg: 'corpo da requisição não pode ser null' })
        );
      }

      const check = await this.usuarioService.userExists(usuario);
      if (check) {
        return <any>res.status(400).json({ msg: 'esse usuário já existe' });
      }

      this.usuarioService.cadastrarUser(usuario);
      return <any>res.status(200).json({ msg: 'usuario cadastrado' });
    } catch (err) {
      throw new HttpException(
        'erro no servidor',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
