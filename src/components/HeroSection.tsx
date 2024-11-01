import React from 'react'
import pet_video_1 from '../assets/videos/pet_video_1.mp4'
import pet_video_2 from '../assets/videos/pet_video_2.mp4'
import pet_video_3 from '../assets/videos/pet_video_3.mp4'
import pet_video_4 from '../assets/videos/pet_video_4.mp4'
import pet_video_5 from '../assets/videos/pet_video_5.mp4'
import pet_video_6 from '../assets/videos/pet_video_6.mp4'

const HeroSection: React.FC = () => {
   return (
      <section className='
         relative h-screen 
         grid grid-cols-2 grid-rows-3 
         lg:grid-cols-3 lg:grid-rows-2
      '>

         {/* ---- VIDEO GRID ---- */}
         <video className='w-full h-full object-cover' autoPlay loop={true} src={pet_video_1} />
         <video className='w-full h-full object-cover' autoPlay loop={true} src={pet_video_2} />
         <video className='w-full h-full object-cover' autoPlay loop={true} src={pet_video_3} />
         <video className='w-full h-full object-cover' autoPlay loop={true} src={pet_video_4} />
         <video className='w-full h-full object-cover' autoPlay loop={true} src={pet_video_5} />
         <video className='w-full h-full object-cover' autoPlay loop={true} src={pet_video_6} />

         {/* ----- OPACITY OVERLAY ----- */}
         <div className='absolute top-0 bottom-0 left-0 right-0 bg-primary-50 opacity-70'></div>

         {/* ---- HERO TEXT ----- */}
         <div className='
            absolute top-0 left-0 right-0 bottom-0 
            flex flex-col justify-center items-center 
            text-text-950 font-medium
         '>
            <div className='w-96 md:w-[40rem] flex flex-col justify-start items-start'>
               <h1 className='text-7xl mb-4'>Pet Heaven</h1>
               <p className='text-xl mb-6'>Where every animal, big or small, deserves to find a loving forever home. Begin your adoption journey today, and find yourself a furry friend!</p>
               <div className='h-14'>
                  <button className='
                     bg-primary-500 px-5 h-full rounded-lg mr-3
                     hover:bg-primary-600 transition-colors
                  '>Adopt a Pet</button>  
                  <button className='
                     border-2 border-primary-500 px-5 h-full rounded-lg
                     hover:bg-primary-500 hover:text-text-50
                  '>Learn More</button>
               </div>
            </div>
         </div>
      </section>
   )
}

export default HeroSection