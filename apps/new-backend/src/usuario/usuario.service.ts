import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/usuario.dto';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';

@Injectable()
export class UsuarioService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUsuarioDto) {
    const usuario = await this.prisma.vi_usuario.findUnique({
      where: { correo: dto.correo },
    });

    if (usuario) {
      throw new ConflictException('Email duplicated');
    }

    const clientRole = await this.prisma.vi_rol.findUnique({
      where: { nombre: 'Cliente' },
    });

    if (!clientRole) {
      throw new Error('Role [Cliente] not found in database.');
    }

    const newUser = await this.prisma.vi_usuario.create({
      data: {
        id: uuidv4(),
        nombre: dto.nombre,
        apellido: dto.apellido,
        correo: dto.correo,
        contrasena: await hash(dto.contrasena, 10),
        id_rol: clientRole.id,
      },
    });

    return {
      id: newUser.id,
      nombre: newUser.nombre,
      apellido: newUser.apellido,
      correo: newUser.correo,
    };
  }
}
