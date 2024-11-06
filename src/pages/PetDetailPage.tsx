import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import { useParams } from 'react-router-dom'
import { PET_API_TYPE, PetApiData, Utils } from '../others/Globals'
import axios from 'axios'
import { AppContext } from '../common/AppContext'

const PetDetailPage: React.FC = () => {
   const { pet_type, pet_id } = useParams()
   const [m_petApiData, setPetApiData] = useState<PetApiData | null>(null)

   useEffect(() => {
      console.log("Param info - pet type: ", pet_type)
      console.log("Param info - pet id: ", pet_id)

      const endpointURL = pet_type === "dog" ? 
         `https://api.thecatapi.com/v1/images/search?has_breeds=1&id=${pet_id}` : 
         `https://api.thedogapi.com/v1/images/search?has_breeds=1&id=${pet_id}` 

      const fetchPetApiData = async(): Promise<void> => {
         try {
            const res = await axios.get(endpointURL, {
               headers: {
                  'x-api-key': pet_type === 'dog' ?
                     import.meta.env.VITE_DOG_API_KEY :
                     import.meta.env.VITE_CAT_API_KEY
               }
            })
            console.log("Results from APi: ", res.data)
            setPetApiData(
               Utils.convertToPetApiData(
                  res.data[0], 
                  pet_type === "dog" ? PET_API_TYPE.DOG : PET_API_TYPE.CAT
               )
            )
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