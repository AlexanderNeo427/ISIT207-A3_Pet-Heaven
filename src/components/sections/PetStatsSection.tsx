import React from 'react'
import PercentageCircle from '../PercentageCircle'

const PetStatsSection: React.FC = () => {
   return (
      <section className='min-h-96 flex justify-center items-center'>
         <div className='my-margin-3xl flex flex-col justify-start items-center px-12'>
            <div className='flex flex-col justify-start items-center max-w-3xl text-center'>
               <h2 className='font-bold text-lg text-text-300 mb-text-xxs'>
                  <i>DID YOU KNOW?</i>
               </h2>
               <p className='text-2xl font-medium text-left'>
                  Every year, millions of pets worldwide are abandoned before they are lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, illo perspiciatis atque ea facilis reprehenderit
               </p>
            </div>

            <div className='
               mt-margin-2xl 
               flex flex-col justify-start items-center gap-24
               lg:flex-row lg:justify-center lg:items-start
            '>
               <PercentageCircle
                  animTimeSeconds={2}
                  statText="of pets were abandoned in 2023 alone"
                  radius={130}
                  fillPercent={72} fillColor='var(--secondary-400)' fillWidth={5}
                  bgColor='lightgray' bgWidth={2}
               />
               <PercentageCircle
                  animTimeSeconds={2}
                  statText="of pets are never able to find a permanent home"
                  radius={130}
                  fillPercent={42} fillColor='var(--secondary-400)' fillWidth={5}
                  bgColor='lightgray' bgWidth={2}
               />
               <PercentageCircle
                  animTimeSeconds={2}
                  statText="are euthanized every year due to overcrowding of shelters"
                  radius={130}
                  fillPercent={28} fillColor='var(--secondary-400)' fillWidth={5}
                  bgColor='lightgray' bgWidth={2}
               />
            </div>
         </div>
      </section>
   )
}

export default PetStatsSection