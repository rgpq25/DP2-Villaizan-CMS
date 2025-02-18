"use client";

import { auth } from "@web/auth";
import { Usuario } from "@web/types";
import axios, { AxiosResponse } from "axios";
import { Session } from "next-auth";
import { createContext, useEffect, useState } from "react";

export const SessionContext = createContext<Usuario | null>(null);

function SessionProvider({ session, children }: { session: Session | null; children: React.ReactNode }) {
  const [userData, setUserData] = useState<Usuario | null>(null);

  useEffect(() => {
    async function getUserData() {
      try {
        const response: AxiosResponse<Usuario> = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/usuario/${session?.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${session?.backendTokens.accessToken}`,
            },
          }
        );

        setUserData(response.data as Usuario);
      } catch (error: any) {
        console.log(error.message);
        return null;
      }
    }

    getUserData();
  }, [session]);

  return <SessionContext.Provider value={userData}>{children}</SessionContext.Provider>;
}
export default SessionProvider;
