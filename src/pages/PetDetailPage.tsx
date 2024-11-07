import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import { CatBreedData, DogBreedData, PET_API_TYPE, PetApiData } from '../others/Globals'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

const PetDetailPage: React.FC = () => {
   const [m_petApiData, setPetApiData] = useState<PetApiData>()
   const m_searchParams = useSearchParams()[0]
   
   useEffect(() => {
      const pet_type = m_searchParams.get('pet_type')
      const pet_id = m_searchParams.get('pet_id')
      const breed_id = m_searchParams.get('breed_id')

      // console.log("PetDetailPage - Pet Type: ", pet_type)
      // console.log("PetDetailPage - Pet ID: ", pet_id)
      // console.log("PetDetailPage - Breed ID: ", breed_id)

      const imgEndpointURL = pet_type === "dog" ? 
         `https://api.thedogapi.com/v1/images/${pet_id}` :
         `https://api.thecatapi.com/v1/images/${pet_id}`  
      
      const breedEndpointURL = pet_type === 'dog' ? 
         `https://api.thedogapi.com/v1/breeds/${breed_id}` :
         `https://api.thecatapi.com/v1/breeds/${breed_id}`

      const fetchPetApiData = async(): Promise<void> => {
         try {
            const imgRes = await axios.get(imgEndpointURL, {
               headers: {
                  'x-api-key': pet_type === 'dog' ?
                  import.meta.env.VITE_DOG_API_KEY :
                  import.meta.env.VITE_CAT_API_KEY
               }
            })
            const breedRes = await axios.get(breedEndpointURL, {
               headers: {
                  'x-api-key': pet_type === 'dog' ?
                  import.meta.env.VITE_DOG_API_KEY :
                  import.meta.env.VITE_CAT_API_KEY
               }
            })

            const imgData = imgRes.data
            const breedData = breedRes.data
            const petApiData = new PetApiData(
               imgData.id, imgData.url, breedData,
               imgData.height, imgData.width, 
               pet_type === "dog" ? PET_API_TYPE.DOG : PET_API_TYPE.CAT
            )
            setPetApiData(petApiData) 
         }
         catch (err: any) {
            console.log("Error fetching from Pet API: ", err.message)
         }
      }
      fetchPetApiData()
   }, [])

   useEffect(() => {
      console.log("Pet api data change: ", m_petApiData)
   }, [m_petApiData])

   return (
      <main>
         <Navbar useSticky/>{
            m_petApiData && 
            <section className='min-h-[30rem] text-center flex flex-col justify-start items-center'>

               {/* ---- BANNER IMAGE ---- */}
               <div style={{
                  backgroundImage: `url(${m_petApiData.imgURL})`
               }} className='w-full h-96 mt-margin-xxs mb-margin-xl'></div>

               {/* --- --- */}
               <div className='max-w-4xl flex flex-col md:flex-row mb-margin-xl mx-margin-s'>

                  <div className='text-center flex-col mb-margin-xl mr-margin-xl'>
                     <div className='flex items-start justify-between mb-margin-s'>
                        <h1 className='font-bold text-3xl'>{m_petApiData.breedData?.breed.toUpperCase()}</h1>
                        <button className='font-semibold rounded-lg outline outline-2 outline-primary-400 px-5 py-3'>Favourite</button>
                     </div>
                     <p className='text-left'>{
                        m_petApiData.apiType === PET_API_TYPE.DOG ? 
                        `${m_petApiData.breedData?.breed}'s are bred for ${(m_petApiData.breedData as DogBreedData).bredFor}`: 
                        `${(m_petApiData.breedData as CatBreedData).description}`
                     }</p>
                  </div>
                  <div className='
                     flex flex-col justify-center items-center rounded-xl
                     w-full max-w-72 text-center text-text-50 bg-white
                  '>
                     <span className='text-lg font-medium mb-margin-xxs'>Adoption Fee</span>
                     <span className='text-xl font-semibold mb-margin-l'>$150.0</span>
                     <button className='
                        text-text-950 bg-primary-500 hover:bg-primary-600 px-6 py-2 rounded-lg
                     '>Adopt Me</button>
                  </div>
               </div>
            </section>
         }<FooterSection />
      </main>
   )
}

export default PetDetailPage