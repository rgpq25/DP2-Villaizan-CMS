import { Body, Controller, Post } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/usuario/dto/usuario.dto';
import { UsuarioService } from 'src/usuario/usuario.service';

@Controller('auth')
export class AuthController {
  constructor(private usuarioService: UsuarioService) {}

  @Post('register')
  async registerUsuario(@Body() dto: CreateUsuarioDto) {
    return this.usuarioService.create(dto);
  }
}
