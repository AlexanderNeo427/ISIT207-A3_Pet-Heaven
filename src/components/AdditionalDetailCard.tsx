import React from 'react'

interface AdditionalDetailCardProps {
   imgURL: string
   attribute: string
   detail: string
}

const AdditionalDetailCard: React.FC<AdditionalDetailCardProps> = props => {
   return (
      <div className='
         flex flex-col justify-start items-start outline outline-1 outline-gray-200
         w-full min-h-44 bg-white rounded-lg shadow-lg pl-8 pt-8
      '>
         <img className='w-9 mb-margin-l' src={props.imgURL} alt="" />
         <span className='font-semibold text-text-50 text-lg'><strong>{props.attribute}</strong></span>
         <span className='font-medium text-text-100 text-base'>{props.detail}</span>
      </div>
   )
}

export default AdditionalDetailCard