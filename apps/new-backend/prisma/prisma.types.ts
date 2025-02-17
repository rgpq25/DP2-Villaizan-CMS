import { Prisma } from '@prisma/client';

export type PublicUsuario = Prisma.vi_usuarioGetPayload<{
  select: {
    id: true;
    nombre: true;
    apellido: true;
    correo: true;
    imagenperfil: true;
    puntosacumulados: true;
  };
}>;
