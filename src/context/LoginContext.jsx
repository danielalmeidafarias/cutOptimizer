import { createContext, useState } from "react";

export const LoginContext = createContext()

export const LoginProvider = ({ children }) => {
    const [sessionId, setSessionId] = useState('')


    return (
        <LoginContext.Provider value={{sessionId, setSessionId}}>
            {children}
        </LoginContext.Provider>
    )
}