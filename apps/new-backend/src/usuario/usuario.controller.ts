import { Controller, Get, Param } from '@nestjs/common';
import { UsuarioService } from './usuario.service';

@Controller('usuario')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Get(':id')
  async getUserProfile(@Param('id') id: string) {
    return await this.usuarioService.findById(id);
  }
}
