import React, { useState } from 'react'
import { PetApiData } from '../others/Globals'

const PetInfoCard: React.FC<{ petApiData: PetApiData }> = ({ petApiData }) => {
   const [m_isHovered, setIsHovered] = useState<boolean>(false) 

   return (
      <div
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}
         className='my-3 relative cursor-pointer'
      >
         <img className='min-h-64 rounded-xl object-cover' src={petApiData.imgURL} alt="" />
         <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-end'>
            <div
               style={{ 
                  height: m_isHovered ? "16rem" : "0rem", 
                  paddingBottom: m_isHovered ? "0.75rem" : "0rem"
               }}
               className='
                  flex flex-col justify-end items-start text-text-950 
                  w-full rounded-b-xl overflow-hidden px-3 shadow-md hover:shadow-xl
                  bg-gradient-to-t from-background-300 from-25% to-transparent transition-all ease-out'
            >
               <span><strong>Breed: </strong>{petApiData.breedData?.breed}</span>
               <span><strong>Lifespan: </strong>{petApiData.breedData?.lifespan}</span>
               <span><strong>Weight: </strong>{petApiData.breedData?.weight}</span>
               {/* <span className='overflow-ellipsis'><strong>Temperaments: </strong>
                  {petApiData.breedData?.temperaments.map(t => <>{t},</>)}
               </span> */}
            </div>
         </div>
      </div>
   )
}

export default PetInfoCard