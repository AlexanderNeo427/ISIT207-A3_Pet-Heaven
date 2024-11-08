import React from 'react'
import { PetApiData } from '../others/Globals'
import heart_svg from '../assets/SVG/heart.svg'

const MorePetsCard: React.FC<{ petApiData: PetApiData }> = ({ petApiData }) => {
   return (
      <div className='
         w-full min-h-72 bg-white outline outline-1 outline-gray-300 rounded-lg shadow-lg 
         cursor-pointer relative
      '>
         <div style={{
            backgroundImage: `url(${petApiData.imgURL})`
         }} className='absolute top-0 bottom-0 left-0 right-0 rounded-lg bg-cover'></div>
         <div className='w-full flex justify-end items-start'>
            <button style={{
               backgroundColor: "rgba(255, 255, 255, 0.8)"
            }} className='w-14 h-14 mr-margin-xs mt-margin-xs rounded-lg z-10'>
               <img className='w-full h-full px-3 py-3' src={heart_svg} alt="" />
            </button>
         </div>
      </div>
   )
}

export default MorePetsCard