import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/auth.dto';
import { JwtPayload } from 'prisma/prisma.types';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.validateUsuario(dto);
    const payload: JwtPayload = {
      username: usuario.correo,
      sub: {
        name: usuario.nombre,
      },
    };

    return {
      usuario,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: '20s',
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

  async refreshToken(user: JwtPayload) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    //!TODO: refreshToken should not get refreshed

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: '20s',
        secret: process.env.JWT_SECRET_KEY,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
      }),
    };
  }
}
