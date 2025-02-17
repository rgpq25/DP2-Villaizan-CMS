import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.validateUsuario(dto);
    const payload = {
      correo: usuario.correo,
      sub: {
        nombre: usuario.nombre,
      },
    };

    return {
      usuario,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '1h',
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: process.env.JWT_REFRESH_TOKEN_KEY,
        }),
      },
    };
  }

  async validateUsuario(dto: LoginDto) {
    const usuario = await this.usuarioService.findByCorreo(dto.correo);
    if (usuario && (await compare(dto.contrasena, usuario.contrasena))) {
      return this.usuarioService.getPublicUserData(usuario);
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}
