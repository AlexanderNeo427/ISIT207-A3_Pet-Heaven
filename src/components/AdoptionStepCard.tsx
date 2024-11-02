import React from 'react'

interface AdoptionStepCardProps {
   imgURL: string
   stepCount: number
   header: string
   content: string
   aspectRatio?: number 
}

const AdoptionStepCard: React.FC<AdoptionStepCardProps> = props => {
   return (
      <div className='max-w-72 w-full flex flex-col justify-start items-center text-center'> 
         <img style={{ aspectRatio: props.aspectRatio || (11/12) }} className='rounded-lg w-full mb-margin-m object-cover' src={props.imgURL} alt="" />
         <div className='w-10 h-10 flex justify-center items-center rounded-full bg-secondary-600 mb-margin-xs'>
            <span className='text-text-950 text-lg font-medium'>{props.stepCount}</span>
         </div>
         <h3 className='text-xl font-bold text-center mb-text-xxs text-text-300'>{props.header}</h3>
         <p className='text-sm font-medium text-text-400'>{props.content}</p>
      </div>
   )
}

export default AdoptionStepCard