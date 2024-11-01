import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import AboutUsSection from '../components/AboutUsSection'
import PetStatsSection from '../components/PetStatsSection'

const HomePage: React.FC = () => {
   return (
      <main>
         <Navbar />
         <HeroSection />
         <AboutUsSection />
         <PetStatsSection />

         <section className='h-screen bg-yellow-400'></section>
         <section className='h-screen bg-red-500'></section>
         <footer className='h-96 bg-black'></footer>
      </main>
   )
}

export default HomePage