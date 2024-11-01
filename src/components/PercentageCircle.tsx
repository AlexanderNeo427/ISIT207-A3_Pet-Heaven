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
   percentage: number
   animTimeSeconds: number
   statText: string
}

const PercentageCircle: React.FC<PercentageCircleProps> = props => { 
   const SIZE = 32

   return (
      <div className='max-w-sm flex flex-col justify-center items-center'>
         <div style={{ width: SIZE, height: SIZE }} className='relative flex justify-center items-center outline outline-green-400'>
            <SvgCircle
               radius={SIZE * 2} fillPercent={10}
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