import React from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import background_img from '../assets/images/testimonials/dog_01.jpg'
import PetReleaseInputField from '../components/sections/PetReleaseInputField'

const PetReleasePage: React.FC = () => {
   return (
      <main>
         <Navbar useSticky />
         <section
            style={{ backgroundImage: `url(${background_img})` }}
            className='min-h-[45rem] bg-cover relative py-margin-3xl flex justify-center items-center'>

            {/* --- TRANSLUCENT BACKGROUND --- */}
            <div className="absolute inset-0 bg-gray-900 opacity-80"></div>

            <form className='
               relative z-10 flex flex-col justify-start 
               items-start gap-6 p-10 w-[40rem]
            '>
               {/* --- TRANSLUCENT BACKGROUND --- */}
               {/* <div className="absolute inset-0 bg-white opacity-70 pointer-events-none rounded-lg"></div> */}

               <h2 className='
                  relative font-medium text-4xl text-text-950 mb-text-xs'
               >PET RELEASE FORM</h2>
               <div className='relative h-full w-full flex justify-center items-center gap-3'>
                  <PetReleaseInputField placeholder='First Name'/>
                  <PetReleaseInputField placeholder='Last Name'/>
               </div>
               <PetReleaseInputField placeholder="Pet Breed"/>
               <PetReleaseInputField placeholder="Pet Type"/>
               <PetReleaseInputField placeholder=""/>
            </form>
         </section>
         <FooterSection />
      </main>
   )
}

export default PetReleasePage