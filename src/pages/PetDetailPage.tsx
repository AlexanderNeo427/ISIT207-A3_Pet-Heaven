import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import { PET_API_TYPE, PetApiData, Utils } from '../others/Globals'
import { AppContext } from '../common/AppContext'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

const PetDetailPage: React.FC = () => {
   const [m_petApiData, setPetApiData] = useState<PetApiData>()

   const m_searchParams = useSearchParams()[0]
   
   useEffect(() => {
      const pet_type = m_searchParams.get('pet_type')
      const pet_id = m_searchParams.get('pet_id')
      const breed_id = m_searchParams.get('breed_id')

      const imgEndpointURL = pet_type === "dog" ? 
         `https://api.thedogapi.com/v1/images/search?id=${pet_id}` :
         `https://api.thecatapi.com/v1/images/search?id=${pet_id}`  
      
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

            const imgData = imgRes.data[0]
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
         <Navbar />
         <section className='min-h-[30rem] text-center'>
            {/* You are on the pet detail page. Pet ID: {} */}
         </section>
         <FooterSection />
      </main>
   )
}

export default PetDetailPage