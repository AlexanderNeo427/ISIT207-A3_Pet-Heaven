import React from 'react'
import pet_video_1 from '../assets/videos/pet_video_1.mp4'
import pet_video_2 from '../assets/videos/pet_video_2.mp4'
import pet_video_3 from '../assets/videos/pet_video_3.mp4'
import pet_video_4 from '../assets/videos/pet_video_4.mp4'
import pet_video_5 from '../assets/videos/pet_video_5.mp4'
import pet_video_6 from '../assets/videos/pet_video_6.mp4'

const VideoGrid: React.FC = () => {
   return (
      <section className='h-screen grid grid-cols-2 grid-rows-3 lg:grid-cols-3 lg:grid-rows-2'>
         <video style={{
            height: "100%", objectFit: "cover"
         }} autoPlay loop={true} src={pet_video_1} />

         <video style={{
            width: "100%", height: "100%", objectFit: "cover"
         }} autoPlay loop={true} src={pet_video_2} />

         <video style={{
            width: "100%", height: "100%", objectFit: "cover"
         }} autoPlay loop={true} src={pet_video_3} />

         <video style={{
            width: "100%", height: "100%", objectFit: "cover"
         }} autoPlay loop={true} src={pet_video_4} />

         <video style={{
            width: "100%", height: "100%", objectFit: "cover"
         }} autoPlay loop={true} src={pet_video_5} />

         <video style={{
            width: "100%", height: "100%", objectFit: "cover"
         }} autoPlay loop={true} src={pet_video_6} />
      </section>
   )
}

export default VideoGrid