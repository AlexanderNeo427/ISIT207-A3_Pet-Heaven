import React from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'

const MyAccountPage: React.FC = () => {
   return (
      <div>
         <Navbar />
         {/* --- TODO --- */}
         <section className='min-h-96 text-xl'>
            MY ACCOUNT PAGE
         </section>
         <FooterSection />
      </div>
   )
}

export default MyAccountPage