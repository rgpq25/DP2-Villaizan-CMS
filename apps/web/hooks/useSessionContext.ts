"use client";

import { SessionContext } from "@web/contexts/session-provider";
import { useContext } from "react";

export default function useSessionContext() {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error("useSession must be used within a SessionProvider [session-provider.tsx]");
  }
  return context;
}
