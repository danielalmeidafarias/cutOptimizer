import { createContext, useState } from "react";

export const SavedListContext = createContext()

export const ListContextProvider = ({ children }) => {
    const [savedList, setSavedList] = useState(null)

    return (
        <SavedListContext.Provider value={{savedList, setSavedList}}> 
            {children}
        </SavedListContext.Provider>
    )
}

