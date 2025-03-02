import axios from "axios";
import NextAuth, { AuthError, CredentialsSignin, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PublicUsuario } from "@repo/db";
import { Response } from "./types";

async function refreshToken(token: JWT): Promise<JWT> {
  console.log("Attempting to refresh token =========================================");
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh`,
      {},
      {
        headers: {
          Authorization: `Refresh ${token.backendTokens.refreshToken}`,
        },
      }
    );

    return {
      ...token,
      backendTokens: {
        accessToken: response.data.accessToken,
        refreshToken: token.backendTokens.refreshToken,
        expiresIn: response.data.expiresIn,
      },
    };
  } catch (error) {
    console.log(error);
    throw new AuthError("Refresh token failed");
  }
}

class InvalidLoginError extends CredentialsSignin {
  code: string;

  constructor(message = "Invalid identifier or password") {
    super(message);
    this.code = message;
  }
}

class UnknownLoginError extends CredentialsSignin {
  code = "Ocurrio un error inesperado. Intenta de nuevo.";
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) return null;

        const { email, password } = credentials;

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`, {
            correo: email,
            contrasena: password,
          });

          if (response.status == 401) {
            console.log(response.statusText);
            return null;
          }

          return response.data;
        } catch (error) {
          if (error instanceof InvalidLoginError) {
            throw new InvalidLoginError(error.code);
          }

          throw new UnknownLoginError();
        }
      },
    }),
    Google({}),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (user && account?.provider === "google") {
          const response: Response<PublicUsuario> = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/usuarios/loginGoogle`,
            {
              email: user.email,
              nombre: profile?.given_name || user.name || "",
              apellido: profile?.family_name || "",
              imagenperfil: profile?.picture || user.image || "",
            }
          );

          if (response.data.status !== "Success") {
            return `/login?error=SigninError&code=${response.data.message}`;
          }

          user = response.data.result;
        }

        return true;
      } catch (error) {
        console.log("See the error: ", error);
        return `/login?error=SigninError&code=Ups, algo salio mal. Intenta de nuevo.`;
      }
    },
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token; // Token has not expired

      const newToken = await refreshToken(token);
      return newToken;
    },
    async session({ token, session }: { token: JWT; session: Session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return url;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
    signOut: "/",
    // signIn: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    // error: `${process.env.NEXT_PUBLIC_APP_URL}/login`,
    // signOut: `${process.env.NEXT_PUBLIC_APP_URL}`,
  },
});
