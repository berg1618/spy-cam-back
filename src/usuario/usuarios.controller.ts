import { Usuario } from './entities/usuario.entity';
import {
  Body,
  Controller,
  Post,
  HttpException,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { UsuarioService } from './usuarios.services';
import { Response } from 'express';
import { LoginDto } from './dto/login.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private usuarioService: UsuarioService) {}

  @Post('/login')
  login(@Body() user: LoginDto) {
    return this.usuarioService.login(user);
  }

  @Post('/cadastro')
  async CadastrarPessoa(
    @Body() usuario: Usuario,
    @Res() res: Response,
  ): Promise<any> {
    try {
      if (Object.values(usuario).length == 0) {
        return <any>(
          res.status(400).json({ msg: 'corpo da requisição não pode ser null' })
        );
      }

      const check = await this.usuarioService.userExists(usuario);
      if (check) {
        return <any>(
          res.status(400).json({ msg: 'esse nome de usuario já existe' })
        );
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
