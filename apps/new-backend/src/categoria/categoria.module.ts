import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from './categoria.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UsuarioService } from 'src/usuario/usuario.service';

@Module({
  providers: [CategoriaService, PrismaService, JwtService, UsuarioService],
  controllers: [CategoriaController],
})
export class CategoriaModule {}
