import React from 'react'
import PercentageCircle from './PercentageCircle'

const PetStatsSection: React.FC = () => {
   return (
      <section className='min-h-96 flex justify-center items-center'>
         <div className='
            my-text-l
            flex flex-col justify-start items-center
            lg:flex-row lg:justify-center lg:items-start
         '> 
            <PercentageCircle 
               percentage={34}
               animTimeSeconds={2} 
               statText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore labore quae nulla expedita ipsam laboriosam reiciendis aspernatur corporis debitis praesentium!"
            /> 
            <PercentageCircle 
               percentage={72}
               animTimeSeconds={2} 
               statText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore labore quae nulla expedita ipsam laboriosam reiciendis aspernatur corporis"
            />
            <PercentageCircle 
               percentage={69}
               animTimeSeconds={2} 
               statText="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore labore quae nulla expedita ipsam corporis debitis praesentium!"
            />
         </div>
      </section>
   )
}

export default PetStatsSection