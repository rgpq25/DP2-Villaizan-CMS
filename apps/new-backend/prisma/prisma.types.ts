import { Prisma } from '@prisma/client';

export type PublicUsuario = Prisma.vi_usuarioGetPayload<{
  select: {
    id: true;
    nombre: true;
    apellido: true;
    correo: true;
    imagenperfil: true;
    puntosacumulados: true;
    vi_rol: true;
  };
}>;

export type JwtPayload = {
  username: string;
  sub: {
    id: string;
    name: string;
  };
};
