import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';
import { JwtPayload } from '@repo/db';

@Controller('auth')
export class AuthController {
  constructor(
    private usuarioService: UsuarioService,
    private authService: AuthService,
  ) {}

  @Post('register')
  async registerUsuario(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Request() req: { user: JwtPayload }) {
    return await this.authService.refreshToken(req.user);
  }
}
