import React from 'react'
import Navbar from '../components/Navbar'
import VideoGrid from '../components/VideoGrid'

const HomePage: React.FC = () => {
   return (
      <div>
         <Navbar />
         <VideoGrid />

         <section className='h-96 outline outline-green-500'></section>
         <section className='h-96 outline outline-purple-500'></section>
         <section className='h-96 outline outline-red-500'></section>
      </div>
   )
}

export default HomePage