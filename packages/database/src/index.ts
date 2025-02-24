import { Prisma } from "../generated/client";
export * from "../generated/client";

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
