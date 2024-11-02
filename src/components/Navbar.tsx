import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from '../others/Globals'
import company_logo from '../assets/images/company_logo.png'

const Navbar: React.FC = () => {
   const headerRef = useRef<HTMLElement>(null)

   useEffect(() => {
      const scrollHandler = (_: any) => {
         const SCROLL_MIN = 300
         const clamped = Math.max(0, Math.min(SCROLL_MIN, window.scrollY))
         const t = Math.min(clamped / SCROLL_MIN, 0.95)
         if (headerRef.current?.style) {
            headerRef.current.style.backgroundColor = `rgba(127, 85, 170, ${t})`
         }
      }
      window.addEventListener('scroll', scrollHandler)
      return () => window.removeEventListener('scroll', scrollHandler)
   }, [])

   return (
      <header
         ref={headerRef}
         className='
            fixed top-0 left-0 right-0 z-10 flex justify-between items-center
            h-16 pr-4 md:pr-8 text-text-950 font-medium text-xl transition-colors'
      >
         {/* ----- COMPANY LOGO ------ */}
         <img src={company_logo} className='h-full w-auto cursor-pointer' alt="" />

         {/* --- SMALL NAVBAR | HIDES WHEN SCREEN EXPANDS ---- */}
         <nav className='flex justify-between md:hidden'>
            <button className='h-full flex flex-col justify-center items-center gap-2 p-2'>
               <div className='bg-background-950 h-[2px] w-8'></div>
               <div className='bg-background-950 h-[2px] w-8'></div>
               <div className='bg-background-950 h-[2px] w-8'></div>
            </button>
         </nav>

         {/* --- LARGE NAVBAR | SHOWS WHEN SCREEN EXPANDS ---- */}
         <nav className='
            hidden md:flex justify-center items-center 
            gap-14 lg:gap-24
         '>
            <Link className='hover:text-accent-600 transition-colors' to={ROUTE_URL.HOME}>Home</Link>
            <Link className='hover:text-accent-600 transition-colors' to={ROUTE_URL.ABOUT}>About</Link>
            <Link className='hover:text-accent-600 transition-colors' to={ROUTE_URL.CONTACT_US}>Contact Us</Link>
         </nav>
         <Link className='
            hidden justify-center items-center bg-primary-500 px-7 h-11 rounded-lg
            md:flex hover:bg-primary-600 transition-colors
         ' to={ROUTE_URL.AUTH}>Login</Link>
      </header>
   )
}

export default Navbar