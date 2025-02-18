"use server";

import { auth } from "@web/auth";
import { Usuario } from "@web/types";
import axios, { AxiosResponse } from "axios";

export async function getUserSession(): Promise<Usuario | null> {
  const session = await auth();
  if (!session) return null;
  const userId = session.user.id;

  let result = null;
  try {
    const response: AxiosResponse<Usuario> = await axios.get(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/usuario/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${session?.backendTokens.accessToken}`,
        },
      }
    );

    console.log(response.data);

    result = response.data;
  } catch (error: any) {
    console.log(error.message);
    return null;
  }

  return result;
}
