import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from '../others/Globals'
import company_logo from '../assets/images/company_logo.png'

interface NavbarProps {
   useSticky?: boolean
   scrollFadeMax?: number 
}

const Navbar: React.FC<NavbarProps> = props => {
   const headerRef = useRef<HTMLElement>(null)

   useEffect(() => {
      const HEADER_RGB = '81, 22, 96'

      const scrollHandler = () => {
         const scrollFadeMax = props.scrollFadeMax || -1
         if (scrollFadeMax < 0 && headerRef.current?.style) {
            headerRef.current.style.backgroundColor = `rgba(${HEADER_RGB}, 1)`
            return
         }

         const clamped = Math.max(0, Math.min(scrollFadeMax, window.scrollY))
         const t = Math.min(clamped / scrollFadeMax, 1)
         if (headerRef.current?.style) {
            headerRef.current.style.backgroundColor = `rgba(${HEADER_RGB}, ${t})`
         }
      }
      scrollHandler()
      window.addEventListener('scroll', scrollHandler)
      return () => window.removeEventListener('scroll', scrollHandler)
   }, [])

   return (
      <header
         ref={headerRef}
         style={{ position: props.useSticky ? "sticky" : "fixed" }}
         className='
            top-0 left-0 right-0 z-10 flex justify-between items-center
            h-14 px-2 md:px-5 text-text-950 font-medium text-lg transition-colors duration-500'
      >
         {/* ----- COMPANY LOGO ------ */}
         <Link className='h-full w-auto' to={ROUTE_URL.HOME}>
            <img src={company_logo} className='h-full w-auto' alt="" />
         </Link>

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
            gap-11 lg:gap-20
         '>
            <Link className='hover:text-accent-600 transition-colors' to={ROUTE_URL.HOME}>Home</Link>
            <Link className='hover:text-accent-600 transition-colors' to={ROUTE_URL.ABOUT}>About</Link>
            <Link className='hover:text-accent-600 transition-colors' to={ROUTE_URL.CONTACT_US}>Contact Us</Link>
            <Link className='hover:text-accent-600 transition-colors' to={ROUTE_URL.GALLERY}>Adoption</Link>
         </nav>
         <Link className='
            hidden justify-center items-center bg-primary-500 px-7 h-10 rounded-lg
            md:flex hover:bg-primary-600 transition-colors
         ' to={ROUTE_URL.AUTH}>Login</Link>
      </header>
   )
}

export default Navbar