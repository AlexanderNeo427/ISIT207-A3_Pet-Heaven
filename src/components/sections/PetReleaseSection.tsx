import React from 'react'
import rabbit_img from '../../assets/images/testimonials/rabbit_01.jpg'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from '../../others/Globals'

const PetReleaseSection: React.FC = () => {
   return (
      <section style={{ backgroundImage: `url(${rabbit_img})` }} className='min-h-96 bg-cover relative py-margin-3xl'>

         {/* --- TRANSLUCENT OVERLAY --- */}
         <div className="absolute inset-0 bg-gray-200 opacity-60"></div> 

         <div className='relative z-10 flex justify-center items-start'>
            <div
               style={{ backgroundImage: `url(${rabbit_img})` }}
               className='bg-cover w-96 h-80 mr-margin-l rounded-2xl'>
            </div>
            <div className='flex flex-col items-start'>
               <h2 className='font-medium text-text-300 text-3xl mb-text-xxs'>Finding a New Home for Your Pet?</h2>
               <p className='font-medium text-xl max-w-2xl w-full text-text-200 mb-text-l'>
                  We understand that life circumstances can change. If you're no longer able to provide the care your pet deserves, we're here to help them find a loving forever home. 
               </p>
               <Link 
                  to={ROUTE_URL.PET_RELEASE}
                  className='
                     font-medium text-xl text-text-900 rounded-lg px-5 py-3
                     hover:underline underline-offset-4 cursor-pointer bg-accent-500
                  '>
                  <i>Pet Release Form →</i>
               </Link>
            </div>
         </div>
      </section>
   )
}

export default PetReleaseSection