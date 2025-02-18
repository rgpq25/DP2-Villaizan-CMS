import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { PublicUsuario, Usuario } from "./types";

declare module "next-auth" {
  interface Session {
    user: PublicUsuario;
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: PublicUsuario;
    backendTokens: {
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
    };
  }
}
