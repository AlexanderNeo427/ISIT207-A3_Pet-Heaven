import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PET_API_TYPE, PetApiData, Utils } from '../others/Globals'
import Navbar from '../components/Navbar'
import PetInfoCard from '../components/PetInfoCard'

const AdoptionGalleryPage: React.FC = () => {
   const [m_petData, setPetData] = useState<PetApiData[]>([])

   useEffect(() => {
      const fetchPetApiData = async (fetchCount: number): Promise<void> => {
         const imageCount = Math.ceil(fetchCount / 2)

         try {
            const catApiRes = await axios.get(
               `https://api.thecatapi.com/v1/images/search?limit=${imageCount}`, {
                  headers: { 'x-api-key': import.meta.env.VITE_CAT_API_KEY }
               }
            )
            const dogApiRes = await axios.get(
               `https://api.thedogapi.com/v1/images/search?limit=${imageCount}`, { 
                  headers: { 'x-api-key': import.meta.env.VITE_DOG_API_KEY 
               }
            })

            const allPetData = [
               ...catApiRes.data
                           .map((obj: any) => Utils.convertToPetApiData(obj, PET_API_TYPE.CAT))
                           .filter((petData: PetApiData) => !petData.imgURL.endsWith('.gif')),

               ...dogApiRes.data
                           .map((obj: any) => Utils.convertToPetApiData(obj, PET_API_TYPE.DOG))
                           .filter((petData: PetApiData) => !petData.imgURL.endsWith('.gif'))
            ]
            Utils.durstenfeldShuffle(allPetData)
            console.log("AdoptionGalleryPage - All pet data: ", allPetData)
            setPetData(allPetData)
         }
         catch (err: any) {
            console.error("Error fetching from TheCatAPI: ", err.message)
         }
      }
      fetchPetApiData(8)
   }, [])
   
   return (
      <main> 
         <Navbar />
         <section className='columns-1 sm:columns-2 md:columns-3 lg:columns-4'>{
            m_petData.map(data => <PetInfoCard key={data.id} petApiData={data}/>)
         }</section>
         {/* {
            m_petData.map((petImg, index) => <img key={index} src={petImg.imgURL} alt="" />)
         } */}
      </main>
   )
}

export default AdoptionGalleryPage