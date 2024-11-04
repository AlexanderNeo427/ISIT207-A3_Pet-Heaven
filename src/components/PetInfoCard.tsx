import React from 'react'
import { PET_API_TYPE, PetApiData, Utils } from '../others/Globals'

const PetInfoCard: React.FC<{ petApiData: PetApiData }> = ({ petApiData }) => {
   return (
      <div className='my-3 relative cursor-pointer outline outline-2 outline-red-500'>
         <img className='min-h-64 rounded-xl object-cover' src={petApiData.imgURL} alt="" />
         <div className='absolute top-0 bottom-0 left-0 right-0 flex justify-center items-end'>
            <div className='flex flex-col justify-end items-start text-text-950'>
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