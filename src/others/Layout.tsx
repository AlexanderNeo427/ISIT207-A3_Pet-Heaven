import React, { ReactNode } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import { Outlet } from 'react-router-dom'

const Layout: React.FC = () => {
   return (
      <>
         <Navbar />
         <Outlet />
         <FooterSection />
      </>
   )
}

export default Layout