import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

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
}
