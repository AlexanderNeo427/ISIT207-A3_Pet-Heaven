import React, { useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../common/AuthContext'

import account_svg from '../assets/SVG/account_circle.svg'
import logout_svg from '../assets/SVG/logout.svg'
import arrow_right_svg from '../assets/SVG/arrow_right.svg'
import { firebaseAuth } from '../others/FirebaseConfig'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { ROUTE_URL } from '../others/Globals'

const AccountDropdown: React.FC = () => {
   const [m_isOpen, setIsOpen] = useState<boolean>(false)
   const m_dropdownRef = useRef<HTMLDivElement>(null)
   const m_authCtx = useContext(AuthContext)
   const m_navTo = useNavigate()

   const windowClickListener = (evt: MouseEvent): void => {
      if (!m_isOpen || !m_dropdownRef.current ||
         m_dropdownRef.current.contains(evt.target as Node)
      ) { return }
      setIsOpen(false)
   }

   useEffect(() => {
      document.addEventListener('mousedown', windowClickListener)
      return () => document.removeEventListener('mousedown', windowClickListener)
   }, [m_isOpen])

   const logoutClickHandler = async (): Promise<void> => {
      await signOut(firebaseAuth)
   }

   return (
      <div ref={m_dropdownRef} className='relative cursor-pointer hidden lg:block'>

         {/* --- HEADER BUTTON --- */}
         <div onClick={() => setIsOpen(isOpen => !isOpen)} className='flex justify-start items-center'>
            <img className='w-8 h-8 mr-margin-xs' src={account_svg} alt="" />
            <button className='mr-text flex'>
               <span className='mr-text-xxs text-lg'>{
                  m_authCtx?.firebaseUser?.displayName ?
                     "Hi, " + m_authCtx.firebaseUser.displayName.split(' ')[0] : "User"
               }</span>
            </button>
            <img className='rotate-90 w-7 h-7' src={arrow_right_svg} alt="" />
         </div>

         {/* --- ABSOLUTELY POSITIONED DROPDOWN ---- */}
         <div
            style={{ display: m_isOpen ? "block" : "none" }}
            className='
               absolute z-10 bg-accent-700 rounded-md shadow-xl right-0 mt-margin-m
               flex flex-col justify-start items-center w-52
            '>
            <button onClick={() => m_navTo(ROUTE_URL.MY_ACCOUNT)} className='
               w-full flex justify-start pl-margin-l items-center py-2 
               hover:bg-accent-400 transition-colors duration-75
            '>
               <img className='w-6 h-6 mr-margin-xs' src={account_svg} alt="" />
               <span>My account</span>
            </button>
            <button onClick={logoutClickHandler} className='
               w-full flex justify-start pl-margin-l items-center py-2 
               hover:bg-accent-400 transition-colors duration-75
            '>
               <img className='w-6 h-6 mr-margin-xs' src={logout_svg} alt="" />
               <span>Logout</span>
            </button>
         </div>
      </div>
   )
}

export default AccountDropdown