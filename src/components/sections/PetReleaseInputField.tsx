import React from 'react'

interface PetReleaseInputField {
   placeholder?: string
}

const PetReleaseInputField: React.FC<PetReleaseInputField> = props => {
   return (
      <div className='relative w-full h-14'>

         {/* --- TRANSLUCENT BACKGROUND --- */}
         <div className="
            absolute inset-0 bg-white opacity-50 pointer-events-none rounded-full
         "></div>

         <input
            type='text' placeholder={props.placeholder ? props.placeholder + "..." : ""}
            className='
               relative w-full h-full px-5 text-text-950 font-medium text-lg rounded-full 
               bg-transparent placeholder-text-800 focus:outline-none
         '/>
      </div>
   )
}

export default PetReleaseInputField