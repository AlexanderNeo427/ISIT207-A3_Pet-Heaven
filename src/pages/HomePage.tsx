import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutUsSection from '../components/AboutUsSection'

const HomePage: React.FC = () => {
   return (
      <>
         <Navbar />
         <HeroSection />
         <AboutUsSection />

         <section className='h-screen bg-yellow-400'></section>
         <section className='h-screen bg-red-500'></section>
         <footer className='h-96 bg-black'></footer>
      </>
   )
}

export default HomePage