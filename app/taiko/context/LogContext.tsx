import { createContext, ReactNode, useContext, useState } from "react";

type LogContextType = {
    logs: string[];
    addLog: (message: string) => void;
}

const LogContext = createContext<LogContextType | null>(null);

export function LogProvider({ children }: { children: ReactNode }) {
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (message: string) => {
        setLogs(prev => [...prev, message]);
    };

    return (
        <LogContext.Provider value={{ logs, addLog }}>
            {children}
        </LogContext.Provider>
    )
}

export function useLogContext() {
    const context = useContext(LogContext);
    if (!context) {
        throw new Error("useLogContext must be used within a LogProvider");
    }
    return context;
}