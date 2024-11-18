import React from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import background_img from '../assets/images/testimonials/dog_01.jpg'
import PetReleaseInputField from '../components/sections/PetReleaseInputField'

const PetReleasePage: React.FC = () => {
   return (
      <main className='flex flex-col min-h-screen'>
         <Navbar useSticky />
         <section
            style={{ backgroundImage: `url(${background_img})` }}
            className='min-h-[45rem] bg-cover relative py-margin-3xl flex justify-center items-center flex-grow'>

            {/* --- TRANSLUCENT BACKGROUND --- */}
            <div className="absolute inset-0 bg-accent-50 opacity-70"></div>

            <form className='
               relative z-10 flex flex-col justify-start items-start gap-6 p-10 max-w-xl w-full
            '>
               {/* --- TRANSLUCENT BACKGROUND --- */}
               {/* <div className="absolute inset-0 bg-white opacity-70 pointer-events-none rounded-lg"></div> */}

               <h2 className='
                  relative font-medium text-4xl text-text-950 mb-text-xs
               '>PET RELEASE FORM</h2>
               <PetReleaseInputField placeholder='Pet Name' />
               <PetReleaseInputField placeholder="Pet Breed" />
               {/* <Dropdown label='Pet Types' options={options} setOptions={setOptions}/> */}
               <PetReleaseInputField placeholder="Pet Type" />
               <PetReleaseInputField inputType='number' placeholder="Pet age" />
               <button className='
                  text-lg font-medium text-text-950 rounded-full px-9 py-3
                  bg-secondary-500 hover:bg-secondary-600 
               '>Submit</button>
            </form>
         </section>
         <FooterSection />
      </main>
   )
}

export default PetReleasePage