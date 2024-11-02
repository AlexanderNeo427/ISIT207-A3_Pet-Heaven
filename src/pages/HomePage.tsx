import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/sections/HeroSection'
import AboutUsSection from '../components/sections/AboutUsSection'
import PetStatsSection from '../components/sections/PetStatsSection'
import AdoptionStepsSection from '../components/sections/AdoptionStepsSection'
import FooterSection from '../components/sections/FooterSection'

const HomePage: React.FC = () => {
   return (
      <main>
         <Navbar />
         <HeroSection />
         <AboutUsSection />
         <PetStatsSection />
         <AdoptionStepsSection />
         <FooterSection />
      </main>
   )
}

export default HomePage