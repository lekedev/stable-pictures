"use client";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type Ctx = { pkg: string; setPkg: (p: string) => void; choose: (p: string) => void };
const BookingCtx = createContext<Ctx>({ pkg: "Essentials", setPkg: () => {}, choose: () => {} });

export function BookingProvider({ children }: { children: ReactNode }) {
  const [pkg, setPkg] = useState("Essentials");
  const choose = useCallback((p: string) => {
    setPkg(p);
    document.getElementById("quote")?.scrollIntoView({ behavior: "smooth" });
  }, []);
  const value = useMemo(() => ({ pkg, setPkg, choose }), [pkg, choose]);
  return <BookingCtx.Provider value={value}>{children}</BookingCtx.Provider>;
}

export const useBooking = () => useContext(BookingCtx);
