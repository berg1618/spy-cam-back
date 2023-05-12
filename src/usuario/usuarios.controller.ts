import { Usuario } from './entities/usuario.entity';
import { Body, Controller, Post, HttpException, HttpStatus, Res } from '@nestjs/common';
import { UsuarioService } from './usuarios.services';
import { Response } from 'express';



@Controller('usuarios')
export class UsuariosController {
    constructor(private usuarioService: UsuarioService) {}

  @Post()
  async CadastrarPessoa(@Body() usuario: Usuario, @Res() res: Response) {
    try {
      // se e vazio
      if (Object.values(usuario).length == 0) {
        return res.status(400).json({msg: "corpo da requisicao nao pode ser null"})
      }

      // verificar se o usuario ja existe
      const check = await this.usuarioService.userExists(usuario)
      if (check) {
        return res.status(400).json({msg: "esse nome de usuario já existe"})
      }

      // tudo ok, cadastrar
      this.usuarioService.cadastarUser(usuario);
      return res.status(200).json({msg: "usuario cadastrado"})
    }
    catch (err) {
      throw new HttpException('erro no servidor', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}