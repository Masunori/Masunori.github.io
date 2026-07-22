"use client";

import { ReactNode } from "react";
import { LogProvider } from "./context/LogContext";
import Navbar from "../components/navbars/Navbar";
import BlankBackground from "../components/backgrounds/BlankBackground";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <BlankBackground>
            <LogProvider>
                <Navbar activeOption="taiko" />
                {children}
            </LogProvider>
        </BlankBackground>
    )
}