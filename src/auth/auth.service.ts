import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuarios.services';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, senha) {
    const user = await this.usuarioService.login(email);

    console.log(user.email, user.id);

    bcrypt.compare(senha, user.senha, function (err, result) {
      if (err) {
        throw new UnauthorizedException();
      }
    });

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
