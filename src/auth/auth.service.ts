import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from '../usuario/usuario.services';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async signIn(email, senha) {
    try {
      const user = await this.usuarioService.login(email);

      const senhaValidada = await bcrypt.compare(senha, user.senha);

      if (senhaValidada) {
        const payload = { email: user.email, sub: user.id };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
      }
      throw new NotFoundException('Usuário não encontrado');
    } catch (err) {
      throw new UnauthorizedException('E-mail incorreto');
    }
  }
}
