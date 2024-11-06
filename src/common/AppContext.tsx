import { createContext, Dispatch, ReactNode, useEffect, useState } from "react";
import { PetApiData } from "../others/Globals";

// Any general information you want to be globally accessible
// just put it within this context 
interface AppContextType {
   petApiData: PetApiData | null
   setAppContext: Dispatch<React.SetStateAction<AppContextType>> | null
}

export const AppContext = createContext<AppContextType | null>(null)

const AppContextProvider: React.FC<{ children: ReactNode }> = props => {
   const [m_contextData, setContextData] = useState<AppContextType>({
      petApiData: null, 
      setAppContext: null 
   })

   useEffect(() => {
      setContextData(oldCtx => {
         const newCtx = { ...oldCtx }
         newCtx.setAppContext = setContextData
         return newCtx
      })
   }, [])

   return (
      <AppContext.Provider value={m_contextData}>
         {props.children}
      </AppContext.Provider>
   )
}

export default AppContextProvider 
