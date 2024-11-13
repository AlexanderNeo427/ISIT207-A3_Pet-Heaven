import React, { HTMLInputTypeAttribute } from 'react'

interface PetReleaseInputField {
   placeholder?: string
   inputType?: HTMLInputTypeAttribute
}

const PetReleaseInputField: React.FC<PetReleaseInputField> = props => {
   return (
      <div className='relative w-full h-14'>

         {/* --- TRANSLUCENT BACKGROUND --- */}
         <div className="
            absolute inset-0 bg-white opacity-70 pointer-events-none rounded-xl
         "></div>

         <input
            type={props.inputType || 'text'}
            placeholder={props.placeholder ? props.placeholder + "..." : ""}
            className='
               relative w-full h-full px-5 text-text-200 font-medium 
               bg-transparent focus:outline-none text-lg placeholder:text-slate-500
         '/>
      </div>
   )
}

export default PetReleaseInputField