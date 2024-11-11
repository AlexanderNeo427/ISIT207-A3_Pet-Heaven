import React from 'react'
import rabbit_img from '../../assets/images/testimonials/rabbit_01.jpg'
import { Link } from 'react-router-dom'
import { ROUTE_URL } from '../../others/Globals'

const PetReleaseSection: React.FC = () => {
   return (
      <section style={{ backgroundImage: `url(${rabbit_img})` }} className='min-h-96 relative py-margin-2xl'>

         {/* --- ABSOLUTELY POSITIONED BACKGROUND ---- */}
         <div className="absolute inset-0 bg-accent-900 opacity-70"></div> {/* Translucent overlay */}

         {/* --- ALSO ABSOLUTELY POSITIONED, SO THE OPACITY ISN'T MESSED UP ----- */}
         <div className='relative z-10 flex justify-center items-start'>
            <div
               style={{ backgroundImage: `url(${rabbit_img})` }}
               className='bg-cover w-80 h-96 mr-margin-l rounded-lg'>
            </div>
            <div className='flex flex-col'>
               <h2 className='font-medium text-text-200 text-3xl mb-text-xxs'>Finding a New Home for Your Pet?</h2>
               <p className='text-xl max-w-2xl w-full text-text-100 mb-text-l'>
                  We understand that life circumstances can change. If you're no longer able to provide the care your pet deserves, we're here to help them find a loving forever home. 
               </p>
               <Link 
                  to={ROUTE_URL.PET_RELEASE}
                  className='font-medium text-2xl text-text-200 hover:underline underline-offset-4 cursor-pointer'>
                  <i>Pet Release Form →</i>
               </Link>
            </div>
         </div>
      </section>
   )
}

export default PetReleaseSection