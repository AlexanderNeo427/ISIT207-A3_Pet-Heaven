import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from '../FirebaseConfig'

const TestHomePage: React.FC = () => {
   const authCtx = useContext(AuthContext)
   const [m_displayEmail, setDisplayEmail] = useState<string>("")

   useEffect(() => { 
      if (authCtx?.firebaseUser?.email) {
         setDisplayEmail(authCtx?.firebaseUser?.email)
      }
   }, [authCtx?.firebaseUser])

   return (
      <div>
         Welcome in, {authCtx?.firebaseUser?.email}
      </div>
   )
}

export default TestHomePage