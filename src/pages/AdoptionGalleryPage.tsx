import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PET_API_TYPE, PetApiData, Utils } from '../others/Globals'
import Navbar from '../components/Navbar'
import PetInfoCard from '../components/PetInfoCard'
import FooterSection from '../components/sections/FooterSection'

const AdoptionGalleryPage: React.FC = () => {
   const [m_petData, setPetData] = useState<PetApiData[]>([])

   useEffect(() => {
      const fetchPetApiData = async (fetchCount: number): Promise<void> => {
         const imageCount = Math.ceil(fetchCount / 2)

         try {
            const catApiRes = await axios.get(
               `https://api.thecatapi.com/v1/images/search?has_breeds=1&limit=${imageCount}`, {
                  headers: { 'x-api-key': import.meta.env.VITE_CAT_API_KEY }
               }
            )
            const dogApiRes = await axios.get(
               `https://api.thedogapi.com/v1/images/search?has_breeds=1&limit=${imageCount}`, { 
                  headers: { 'x-api-key': import.meta.env.VITE_DOG_API_KEY 
               }
            })
            // console.log(...catApiRes.data, ...dogApiRes.data)

            const allPetData = [
               ...catApiRes.data
                           .map((obj: any) => Utils.convertToPetApiData(obj, PET_API_TYPE.CAT))
                           .filter((petData: PetApiData) => !petData.imgURL.endsWith('.gif'))
               ,
               ...dogApiRes.data
                           .map((obj: any) => Utils.convertToPetApiData(obj, PET_API_TYPE.DOG))
                           .filter((petData: PetApiData) => !petData.imgURL.endsWith('.gif'))
            ]
            Utils.durstenfeldShuffle(allPetData)
            setPetData(allPetData)
            console.log(allPetData)
         }
         catch (err: any) {
            console.error("Error fetching from API: ", err.message)
         }
      }
      fetchPetApiData(10)
   }, [])
   
   return (
      <main> 
         <Navbar useSticky={true} />
         <section className='flex justify-start items-center px-4 py-3 gap-2'>
            <div className='text-center rounded-full px-6 py-3 bg-gray-300'>Le Option</div>
            <div className='text-center rounded-full px-6 py-3 bg-gray-300'>Le Option</div>
            <div className='text-center rounded-full px-6 py-3 bg-gray-300'>Le Option</div>
            <div className='text-center rounded-full px-6 py-3 bg-gray-300'>Le Option</div>
            <div className='text-center rounded-full px-6 py-3 bg-gray-300'>Le Option</div>
            <div className='text-center rounded-full px-6 py-3 bg-gray-300'>Le Option</div>
         </section>
         <section className='min-h-96 flex justify-center items-center'>
            <div className='max-w-6xl mx-margin-s columns-2 md:columns-3 2xl:columns-4 my-margin-l'>{
               m_petData.map(data => {
                  return <PetInfoCard key={data.id} petApiData={data} />
               })
            }</div>
         </section>
         <FooterSection />
      </main>
   )
}

export default AdoptionGalleryPage