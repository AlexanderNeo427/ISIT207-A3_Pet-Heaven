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
      <svg className='-rotate-90' width={props.radius * 2} height={props.radius * 2}>
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
   percentage: number
   animTimeSeconds: number
   statText: string
}

const PercentageCircle: React.FC<PercentageCircleProps> = props => {
   return (
      <div className='max-w-sm flex flex-col justify-center items-center'>
         <div className='w-16 h-16'>
            {/* <svg width="150" height="150">
               <circle r="70" cx="75" cy="75" fill="transparent" stroke="lightgrey" stroke-width="0.5rem" stroke-dasharray="439.8" stroke-dashoffset="0"></circle>
               <circle r="70" cx="75" cy="75" fill="transparent" stroke="blue" stroke-width="0.5rem" stroke-dasharray="439.8" stroke-dashoffset="99"></circle>
            </svg> */}
            <SvgCircle
               radius={80} fillPercent={10}
               fillWidth={5} fillColor='red'
               bgWidth={5} bgColor='gray'
            />
            <span className='font-semibold text-xl'>{props.percentage}%</span>
         </div>
         <p className='font-medium text-sm'>{props.statText}</p>
      </div>
   )
}

export default PercentageCircle