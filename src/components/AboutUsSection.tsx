import React from 'react'
import golden_retriever_img from '../assets/images/golden_retriever.jpg'

const AboutUsSection: React.FC = () => {
   return (
      <section className='min-h-96 flex justify-center items-center bg-background-900'>
         <div className='flex justify-start items-start gap-4 my-xl mx-l'>

            {/* --- LEFT/TOP ---- */}
            <div className='max-w-xl mr-xl'>
               <h2 className='text-xl text-text-300 font-medium'>Who are we?</h2>
               <h3 className='text-3xl mt-text-xxs mb-text-xs'>A group of animal lovers who believe that all animals deserve a second chance at happiness</h3>
               <p className='mb-text-l'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum corporis possimus atque minus minima reiciendis nihil illo ad enim ab dicta numquam dolor quam eligendi aliquam neque ratione beatae excepturi aperiam rerum explicabo odio, eum quibusdam dignissimos! Asperiores explicabo quasi voluptatum inventore ratione est quidem aspernatur ullam, debitis pariatur optio!</p>
               <button className='
                  px-5 py-3 ronded-lg font-medium text-text-950 bg-primary-500
                  hover:bg-primary-400 transition-colors
               '>Our History</button>
            </div>

            {/* --- RIGHT/BOTTOM ---- */}
            <img className='
               hidden max-w-sm rounded-3xl object-cover md:block
            ' src={golden_retriever_img} alt="" />
         </div>
      </section>
   )
}

export default AboutUsSection