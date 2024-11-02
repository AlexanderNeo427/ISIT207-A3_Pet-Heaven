import React from 'react'
import AdoptionStepCard from '../AdoptionStepCard'
import dog_img_1 from '../../assets/images/golden_retriever.jpg'
import dog_img_2 from '../../assets/images/shiba_inu.jpg'
import dog_img_3 from '../../assets/images/golden_retriever_2.jpg'

const AdoptionStepsSection: React.FC = () => {
   return (
      <section className='flex flex-col justify-start items-center bg-blue-50 py-margin-3xl'>
         <div className='w-full max-w-3xl px-8'>
            <h2 className='text-4xl mb-text-xxs text-text-50'>Looking to adopt?</h2>
            <p className='text-lg font-medium text-text-100'>
               <i>Here's how to get up and running with the adoption process in 3 easy steps!</i>
            </p>
         </div>

         <div className='
            flex flex-col justify-start items-center gap-10
            max-w-5xl relative p-10
         '>
            <div className='
               flex flex-col justify-start items-center gap-10
               sm:flex-row sm:justify-center sm:items-center
            '>
               <AdoptionStepCard
                  imgURL={dog_img_1} stepCount={1} header='Sign up as a member'
                  content='Click here to register as a member to proceed with the adoption process'
               />
               <AdoptionStepCard
                  imgURL={dog_img_2} stepCount={2} header='Find a pet' aspectRatio={(8/11)}
                  content='Browser our large catalogue of pets who are currently looking for their forever home'
               />
               <AdoptionStepCard
                  imgURL={dog_img_3} stepCount={3} header='Adopt!'
                  content='Simply pick the pet that you want, and complete the adoption request form'
               />
            </div>
         </div>
      </section>
   )
}

export default AdoptionStepsSection