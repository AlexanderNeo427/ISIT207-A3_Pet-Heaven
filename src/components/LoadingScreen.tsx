import React from 'react'

const LoadingScreen: React.FC = () => {
   return (
      <div className='w-full h-screen flex justify-center items-center'>
         <div className='mt-margin-l relative w-32 h-32'>
            <div className='absolute inset-0 flex justify-center items-center'>
               <div style={{ animationDuration: "0.95s" }} className='
                  w-32 h-32 animate-spin border-4 border-t-accent-500 border-transparent rounded-full
               '></div>
            </div>
            <div className='absolute inset-0 flex justify-center items-center'>
               <div style={{ animationDuration: "1s" }} className='
                  w-24 h-24 animate-spin border-4 border-t-accent-500 border-transparent rounded-full
               '></div>
            </div>
            <div className='absolute inset-0 flex justify-center items-center'>
               <div style={{ animationDuration: "1.05" }} className='
                  w-14 h-14 animate-spin border-4 border-t-accent-500 border-transparent rounded-full
               '></div>
            </div>
         </div>
      </div>
   )
}

export default LoadingScreen