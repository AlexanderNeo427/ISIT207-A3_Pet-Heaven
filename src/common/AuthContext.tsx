import { User as FirebaseUser, onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useEffect, useState } from 'react'
import { firebaseAuth } from '../others/FirebaseConfig'

interface AuthContextType {
   firebaseUser: FirebaseUser | null
}

export const AuthContext = createContext<AuthContextType | null>(null)

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = props => {
   const [m_authState, setAuthState] = useState<AuthContextType>({ firebaseUser: null })

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(firebaseAuth, newFirebaserUser => {
         setAuthState({ firebaseUser: newFirebaserUser })
      })
      return () => unsubscribe()
   })

   return (
      // <>{props.children}</>
      <AuthContext.Provider value={m_authState}>
         {props.children}
      </AuthContext.Provider>
   )
}

export default AuthContextProvider 