import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './others/FirebaseConfig'
import App from './App'
import AuthContextProvider from './common/AuthContext'

createRoot(document.getElementById('root')!).render(
   <StrictMode>
      <AuthContextProvider>
         <App />
      </AuthContextProvider>
   </StrictMode>,
)
