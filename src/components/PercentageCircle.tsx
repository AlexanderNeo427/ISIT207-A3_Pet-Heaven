import React from 'react'

interface SvgCircleProps {
   radius: number

   fillPercent: number
   fillWidth: number
   fillColor: string

   bgWidth: number
   bgColor: string
}

const SvgCircle: React.FC<SvgCircleProps> = props => {
   const bgCircumference = 2 * Math.PI * (props.radius - props.bgWidth * 0.5)
   const fillCircumference = 2 * Math.PI * (props.radius - props.fillWidth * 0.5)
   const strokeDashoffset = fillCircumference * (1 - props.fillPercent / 100);

   return (
      <svg className='-rotate-90 absolute top-0 bottom-0 left-0 right-0' width={props.radius * 2} height={props.radius * 2}>
         <circle
            r={props.radius - props.bgWidth * 0.5}
            cx={props.radius}
            cy={props.radius}
            fill="transparent"
            stroke={props.bgColor}
            strokeWidth={props.bgWidth}
            strokeDasharray={bgCircumference}
         >
         </circle>
         <circle
            r={props.radius - props.fillWidth * 0.5}
            cx={props.radius}
            cy={props.radius}
            fill="transparent"
            stroke={props.fillColor}
            strokeWidth={props.fillWidth}
            strokeDasharray={fillCircumference}
            strokeDashoffset={strokeDashoffset}
         >
         </circle>
      </svg>
   )
}

interface PercentageCircleProps {
   animTimeSeconds: number
   statText: string

   radius: number

   fillPercent: number
   fillWidth: number
   fillColor: string

   bgWidth: number
   bgColor: string
}

const PercentageCircle: React.FC<PercentageCircleProps> = props => {
   return (
      <div className='max-w-sm flex flex-col justify-center items-center'>
         <div 
            style={{ width: props.radius * 2, height: props.radius * 2 }} 
            className='relative flex justify-center items-center'
         >
            <div 
               style={{ width: props.radius * Math.sqrt(2), height: props.radius * Math.sqrt(2) }} 
               className='flex flex-col justify-center items-center text-center pb-8'>
               <span className='font-extralight text-2xl text-text-200'>%</span>
               <span className='font-extrabold text-7xl mb-7'>{props.fillPercent}</span>
               <p className='h-10 font-medium text-xs text-text-100'>{props.statText}</p>
            </div>

            {/* Absolutely positioned circle - Do not touch */}
            <SvgCircle
               radius={props.radius} fillPercent={props.fillPercent}
               fillWidth={props.fillWidth} fillColor={props.fillColor}
               bgWidth={props.bgWidth} bgColor={props.bgColor}
            />
         </div>
      </div>
   )
}

export default PercentageCircle