import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/auth.dto';
import { JwtPayload } from 'prisma/prisma.types';

const EXPIRE_TIME_MINUTES = 1;
const EXPIRE_TIME_SECONDS = EXPIRE_TIME_MINUTES * 60;
const EXPIRE_TIME_MILISECONDS = EXPIRE_TIME_SECONDS * 1000;

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
        id: usuario.id,
        name: usuario.nombre,
      },
    };

    let userSecretKey = await this.usuarioService.getUserSecretKey(usuario.id);

    if (userSecretKey === null) {
      userSecretKey = await this.usuarioService.setUserSecretKey(usuario.id);
    }

    return {
      user: usuario,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: EXPIRE_TIME_SECONDS,
          secret: `${process.env.JWT_SECRET_KEY}${userSecretKey}`,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: '7d',
          secret: `${process.env.JWT_REFRESH_TOKEN_KEY}${userSecretKey}`,
        }),
        expiresIn: new Date().setTime(
          new Date().getTime() + EXPIRE_TIME_MILISECONDS,
        ),
      },
    };
  }

  async validateUsuario(dto: LoginDto) {
    const usuario = await this.usuarioService.findByCorreo(dto.correo);
    if (usuario && (await compare(dto.contrasena, usuario.contrasena))) {
      return await this.usuarioService.getPublicUserData(usuario);
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async refreshToken(user: JwtPayload) {
    const payload = {
      username: user.username,
      sub: user.sub,
    };

    const userSecretKey = await this.usuarioService.getUserSecretKey(
      user.sub.id,
    );

    //!TODO: refreshToken should not get refreshed

    return {
      accessToken: await this.jwtService.signAsync(payload, {
        expiresIn: EXPIRE_TIME_SECONDS,
        secret: `${process.env.JWT_SECRET_KEY}${userSecretKey}`,
      }),
      refreshToken: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: `${process.env.JWT_REFRESH_TOKEN_KEY}${userSecretKey}`,
      }),
      expiresIn: new Date().setTime(
        new Date().getTime() + EXPIRE_TIME_MILISECONDS,
      ),
    };
  }
}
