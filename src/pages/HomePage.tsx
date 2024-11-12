import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/sections/HeroSection'
import AboutUsSection from '../components/sections/AboutUsSection'
import PetStatsSection from '../components/sections/PetStatsSection'
import AdoptionStepsSection from '../components/sections/AdoptionStepsSection'
import FooterSection from '../components/sections/FooterSection'
import TestimonialsSection from '../components/sections/TestimonialsSection'
import PetReleaseSection from '../components/sections/PetReleaseSection'

const HomePage: React.FC = () => {
   return (
      <main>
         <Navbar scrollFadeMax={400}/>
         <HeroSection />
         <AboutUsSection />
         <PetStatsSection />
         <AdoptionStepsSection />
         <PetReleaseSection />
         <TestimonialsSection />
         <FooterSection />
      </main>
   )
}

export default HomePage