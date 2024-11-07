import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { PET_API_TYPE, PetApiData, Utils } from '../others/Globals'
import search_icon from '../assets/SVG/search.svg'
import Navbar from '../components/Navbar'
import PetInfoCard from '../components/PetInfoCard'
import FooterSection from '../components/sections/FooterSection'
import Select from 'react-select'

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
               headers: { 'x-api-key': import.meta.env.VITE_DOG_API_KEY }
            })

            // DEBUG
            // console.log([...catApiRes.data, ...dogApiRes.data])

            const allPetData = [
               ...catApiRes.data
                  .map((obj: any) => Utils.convertToPetApiData(obj, PET_API_TYPE.CAT))
                  .filter((petData: PetApiData) => !petData.imgURL.endsWith('.gif')),
               ...dogApiRes.data
                  .map((obj: any) => Utils.convertToPetApiData(obj, PET_API_TYPE.DOG))
                  .filter((petData: PetApiData) => !petData.imgURL.endsWith('.gif'))
            ]
            Utils.durstenfeldShuffle(allPetData)
            setPetData(allPetData)
         }
         catch (err: any) {
            console.error("Error fetching from API: ", err.message)
         }
      }
      fetchPetApiData(20)
   }, [])

   const petOptions = [
      { value: 'dog', label: 'Cat' },
      { value: 'cat', label: 'Dog' }
   ]

   return (
      <main>
         <Navbar useSticky={true} />
         <section className='flex justify-center items-center py-margin-l px-margin-s'>
            <div className='flex'>
               {/* ---- DROPDOWN CONTAINER ---- */}
               <div className='mr-margin-l'>
                  <Select 
                     defaultValue={[petOptions[0], petOptions[1]]} 
                     options={petOptions} isMulti={true}
                  />
               </div>

               {/* ---- SEARCH BAR ----- */}
               <div className='flex justify-start items-center bg-gray-200 w-48 h-11 px-3 py-2 rounded-lg'>
                  <img className='w-7 h-7 mr-margin-xs' src={search_icon} alt="" />
                  <input className='bg-transparent w-full focus:outline-none' type="text" />
               </div>
            </div>

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