import { createContext, Dispatch, ReactNode, useState } from "react";
import { PetApiData } from "../others/Globals";

// Any general information you want to be globally accessible
// just put it within this context 
interface AppContextType {
   petApiData: PetApiData
   setPetApiData: Dispatch<React.SetStateAction<PetApiData>>
}

export const AppContext = createContext<AppContextType | null>(null)

const AppContextProvider: React.FC<{ children: ReactNode }> = props => {
   const [m_petApiData, setPetApiData] = useState<PetApiData>()

   const appContextVal = {
      petApiData: m_petApiData,
      setPetApiData: setPetApiData
   } as AppContextType

   return (
      <AppContext.Provider value={appContextVal}>
         {props.children}
      </AppContext.Provider>
   )
}

export default AppContextProvider 
