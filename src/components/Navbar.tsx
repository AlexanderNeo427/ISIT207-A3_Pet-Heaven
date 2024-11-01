import React from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from '../others/Globals'
import company_logo from '../assets/images/company_logo.png'

const Navbar: React.FC = () => {
   const NAVBAR_HEIGHT_REM = 4

   return (
      <header 
         className='fixed top-0 left-0 right-0 z-10 flex justify-between pr-16 text-text-950' 
         style={{ height: NAVBAR_HEIGHT_REM + "rem" }}
      >
         {/* ----- COMPANY LOGO ------ */}
         <img src={company_logo} className='w-auto cursor-pointer' alt="" />

         {/* --- SMALL NAVBAR | HIDES WHEN SCREEN EXPANDS ---- */}
         <nav className='flex justify-between md:hidden'>
            <button className='h-full flex flex-col justify-center items-center gap-2 p-2'>
               <div className='bg-black h-[2px] w-8'></div>
               <div className='bg-black h-[2px] w-8'></div>
               <div className='bg-black h-[2px] w-8'></div>
            </button>
         </nav>

         {/* --- LARGE NAVBAR | SHOWS WHEN SCREEN EXPANDS ---- */}
         <nav className='hidden md:flex justify-center items-center gap-8 font-medium text-lg'>
            <Link to={ROUTE_URL.HOME}>Home</Link>
            <Link to={ROUTE_URL.ABOUT}>About</Link>
            <Link to={ROUTE_URL.CONTACT_US}>Contact Us</Link>
            <Link to={ROUTE_URL.AUTH}>Login</Link>
         </nav>
      </header>
   )
}

export default Navbar