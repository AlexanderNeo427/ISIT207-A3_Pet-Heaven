import React from 'react'

import tick_svg from '../assets/SVG/tick.svg'
import email_svg from '../assets/SVG/email.svg'
import fingerprint_svg from '../assets/SVG/fingerprint.svg'
import clock_svg from '../assets/SVG/clock.svg'

const ReceiptPage: React.FC = () => {
   return (
      <main className='h-screen w-screen bg-primary-800 flex justify-center items-center'>

         {/* --- CONFIRMATION CONTAINER --- */}
         <div className='w-full h-full sm:max-w-2xl sm:max-h-[70%] flex flex-col shadow-xl rounded-t-xl'>

            {/* --- HEADER --- */}
            <div className='w-full bg-accent-500 flex flex-col justify-start items-center px-11 py-10 rounded-t-xl'>
               {/* <div>
                  <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                     <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="shape-fill"></path>
                  </svg>
               </div> */}
               <img className='w-32 h-32 mb-margin-s' src={tick_svg} />
               <h1 className='text-text-950 font-semibold text-4xl'>Adoption Success!</h1>
            </div>

            {/* --- DETAILS ---- */}
            <div className='
               w-full h-full flex flex-col justify-start items-start 
               text-text-50 bg-background-900 px-10 py-8 
            '>
               <h2 className='text-3xl font-medium mb-margin-m'>
                  Pickup ID: <strong className='underline underline-offset-4'>#jslifjslefj</strong>
               </h2>

               <div className='flex justify-start items-center mb-margin-s'>
                  <img className='w-10 h-10 mr-margin-s' src={email_svg} />
                  <p className='font-medium text-xl text-text-50'>An email will be sent to you with the adoption details</p>
               </div>

               <div className='flex justify-start items-center mb-margin-s'>
                  <img className='w-10 h-10 mr-margin-s' src={clock_svg} />
                  <p className='font-medium text-lg text-text-50'>Be sure to arrive on time to collect your pet</p>
               </div>

               <div className='flex justify-start items-center mb-margin-s'>
                  <img className='w-10 h-10 mr-margin-s' src={fingerprint_svg} />
                  <p className='font-medium text-lg text-text-50'>Be sure to bring your Pickup ID</p>
               </div>
            </div>
         </div>
      </main>
   )
}

export default ReceiptPage