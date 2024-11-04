import React, { useState } from 'react'
import { PET_API_TYPE, PetApiData, Utils } from '../others/Globals'

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
                  w-full rounded-b-xl overflow-hidden px-3
                  bg-gradient-to-t from-primary-400 from-15% to-transparent transition-all ease-out'
            >
               <span><strong>Name: </strong>Lorem ipsum Dolor</span>
               <span><strong>Age: </strong>{Utils.randInt(1, 14)}</span>
               {/* <span><strong>Breed: </strong>{petApiData.breeds}</span> */}
               <span><strong>Type: </strong>{
                  petApiData.apiType === PET_API_TYPE.DOG ? "Dog" : "Cat"
               }</span>
            </div>
         </div>
      </div>
   )
}

export default PetInfoCard