import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUsuarioDto } from './dto/usuario.dto';
import { v4 as uuidv4 } from 'uuid';
import { hash } from 'bcrypt';
import { vi_usuario } from '@repo/db';
import { PublicUsuario } from '@repo/db';
import { randomBytes } from 'crypto';

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
        secret_key: randomBytes(32).toString('hex'),
      },
    });

    return await this.getPublicUserData(newUser);
  }

  async getUserSecretKey(id: string) {
    const user = await this.prisma.vi_usuario.findUnique({
      where: { id: id },
    });

    if (!user) {
      throw new ConflictException('User not found');
    }

    return user.secret_key;
  }

  async setUserSecretKey(id: string) {
    const secretKey = randomBytes(32).toString('hex');

    await this.prisma.vi_usuario.update({
      where: { id: id },
      data: { secret_key: secretKey },
    });

    return secretKey;
  }

  async findByCorreo(correo: string) {
    return await this.prisma.vi_usuario.findUnique({
      where: {
        correo: correo,
      },
    });
  }

  async findById(id: string) {
    return await this.prisma.vi_usuario.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        nombre: true,
        apellido: true,
        correo: true,
        imagenperfil: true,
        puntosacumulados: true,
        vi_rol: true,
      },
    });
  }

  async getPublicUserData(usuario: vi_usuario): Promise<PublicUsuario> {
    const userRole = await this.prisma.vi_rol.findUnique({
      where: { id: usuario.id_rol },
    });

    if (userRole === null) {
      throw new Error('User role not found');
    }

    return {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      imagenperfil: usuario.imagenperfil,
      puntosacumulados: usuario.puntosacumulados,
      vi_rol: userRole,
    };
  }
}
