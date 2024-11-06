import React, { useState } from 'react'
import { PET_API_TYPE, PetApiData } from '../others/Globals'
import { useNavigate } from 'react-router-dom'

const PetInfoCard: React.FC<{ petApiData: PetApiData }> = ({ petApiData }) => {
   const [m_isHovered, setIsHovered] = useState<boolean>(false) 
   
   const navTo = useNavigate()

   const cardClickHandler = () => {
      // console.log("PetINfoCard() - ID: ", petApiData.id)
      // console.log("PetInfoCard() - About to navigate to detail page...")
      const petType = petApiData.apiType === PET_API_TYPE.DOG ? "dog" : "cat"
      navTo(`/pet_detail/${petType}/${petApiData.id}`)
   }

   return (
      <div
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}
         onClick={cardClickHandler}
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
               <span><strong>Lifespan: </strong>
                  {petApiData.breedData?.lifespan}
                  {petApiData.apiType === PET_API_TYPE.CAT ? " years" : ""}
               </span>
               <span><strong>Weight: </strong>{petApiData.breedData?.weight} kg</span>
            </div>
         </div>
      </div>
   )
}

export default PetInfoCard