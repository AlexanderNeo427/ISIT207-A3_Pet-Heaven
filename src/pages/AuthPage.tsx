import React, { useState } from 'react'
import Navbar from '../components/Navbar'

const AuthPage: React.FC = () => {
   const isLoginMode = useState<boolean>(true)

   return (
      <>
         <Navbar />
         Auth Page
      </>
   )
}

export default AuthPage