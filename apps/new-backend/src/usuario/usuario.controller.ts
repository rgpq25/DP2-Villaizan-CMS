import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.usuarioService.findById(id);
  }
}
