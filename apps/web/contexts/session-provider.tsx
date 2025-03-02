"use client";

import { Session } from "next-auth";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export const SessionContext = createContext<{
  session: Session | null;
  setSession: Dispatch<SetStateAction<Session | null>>;
} | null>(null);

export default function SessionProvider({
  data,
  children,
}: {
  data: Session | null;
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(data);

  return (
    <SessionContext.Provider
      value={{
        session,
        setSession,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}
