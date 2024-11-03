import React from 'react'
import PercentageCircle from './PercentageCircle'

const PetStatsSection: React.FC = () => {
   return (
      <section className='min-h-96 flex justify-center items-center'>
         <div className='
            my-text-l
            flex flex-col justify-start items-center gap-xxl
            lg:flex-row lg:justify-center lg:items-start
         '>
            <PercentageCircle
               animTimeSeconds={2}
               statText="of pets are abandoned"
               radius={130}
               fillPercent={69} fillColor='var(--accent-500)' fillWidth={5}
               bgColor='lightgray' bgWidth={3}
            />
            <PercentageCircle
               animTimeSeconds={2}
               statText="of dogs are eventually able to find a permanent home"
               radius={130}
               fillPercent={25} fillColor='var(--accent-500)' fillWidth={5}
               bgColor='lightgray' bgWidth={3}
            />
            <PercentageCircle
               animTimeSeconds={2}
               statText="are euthanized every year due to overcrowding of shelters"
               radius={130}
               fillPercent={58} fillColor='var(--accent-500)' fillWidth={5}
               bgColor='lightgray' bgWidth={3}
            />
         </div>
      </section>
   )
}

export default PetStatsSection