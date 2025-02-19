import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoriaDto } from './dto/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(private prismaService: PrismaService) {}

  async getCategorias() {
    return await this.prismaService.vi_categoria_publicacion.findMany({
      where: {
        estaactivo: true,
      },
    });
  }

  async createCategoria(dto: CreateCategoriaDto) {
    return await this.prismaService.vi_categoria_publicacion.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        colorfondo: dto.colorfondo,
        colortexto: dto.colortexto,
      },
    });
  }

  async updateCategoria(id: string, dto: CreateCategoriaDto) {
    return await this.prismaService.vi_categoria_publicacion.update({
      where: { id: id },
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        colorfondo: dto.colorfondo,
        colortexto: dto.colortexto,
      },
    });
  }

  async deleteCategoria(id: string) {
    return await this.prismaService.vi_categoria_publicacion.update({
      where: { id: id },
      data: {
        estaactivo: false,
      },
    });
  }
}
