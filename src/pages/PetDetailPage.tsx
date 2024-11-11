import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import { CatBreedData, DogBreedData, PET_API_TYPE, PetApiData, ROUTE_URL, Utils } from '../others/Globals'
import { useNavigate, useSearchParams } from 'react-router-dom'
import MorePetsCard from '../components/MorePetsCard'

import LoadingScreen from '../components/LoadingScreen'
import AdditionalDetailCard from '../components/AdditionalDetailCard'
import { LoremIpsum } from 'lorem-ipsum'

import calendar_svg from '../assets/SVG/calendar.svg'
import ruler_svg from '../assets/SVG/ruler.svg'
import weighing_scale_svg from '../assets/SVG/weighing_scale.svg'
import paw_svg from '../assets/SVG/paw.svg'
import heart_svg from '../assets/SVG/heart.svg'
import child_friendly_svg from '../assets/SVG/child_friendly.svg'
import rabbit_svg from '../assets/SVG/rabbit.svg'
import verified_user_svg from '../assets/SVG/verified_user.svg'
import male_svg from '../assets/SVG/male.svg'
import female_svg from '../assets/SVG/female.svg'

const PetDetailPage: React.FC = () => {
   const [m_isLoading, setIsLoading] = useState<boolean>(true)
   const [m_petApiData, setPetApiData] = useState<PetApiData>()
   const [m_morePets, setMorePets] = useState<PetApiData[]>([])
   const m_searchParams = useSearchParams()[0]
   const m_navTo = useNavigate()

   const SVGs = [
      calendar_svg, ruler_svg, weighing_scale_svg, paw_svg, heart_svg,
      child_friendly_svg, rabbit_svg, verified_user_svg
   ]

   useEffect(() => {
      const pet_type = m_searchParams.get('pet_type')
      const pet_id = m_searchParams.get('pet_id')
      const breed_id = m_searchParams.get('breed_id')

      const fetchRequiredPetApiData = async (): Promise<void> => {
         const petApiType = pet_type === "dog" ? PET_API_TYPE.DOG : PET_API_TYPE.CAT
         const data = await Utils.getOnePetApiData(petApiType, String(pet_id), String(breed_id))
         setPetApiData(data)

         const morePets = await Utils.getBatchPetAPIData(4)
         setMorePets(morePets)
         setIsLoading(false)
      }
      fetchRequiredPetApiData()
   }, [])

   interface PetAttribute {
      attribute: string
      imgURL: string
      info: string
   }

   const getAdditionalInfo = (petApiData: PetApiData): PetAttribute[] => {
      const isMale = Utils.randFloat(0, 100) <= 50

      switch (petApiData.apiType) {
         case PET_API_TYPE.DOG:
            const dogBreedData = petApiData.breedData as DogBreedData
            return [
               { attribute: "Pet Type", imgURL: paw_svg, info: "Dog" },
               { attribute: "Lifespan", imgURL: calendar_svg, info: dogBreedData.lifespan },
               { attribute: "Height", imgURL: ruler_svg, info: dogBreedData.height + " cm" },
               { attribute: "Weight", imgURL: weighing_scale_svg, info: dogBreedData.weight + " kg" },
               { attribute: "Gender", imgURL: isMale ? male_svg : female_svg, info: isMale ? "Male" : "Female" }
            ]
         case PET_API_TYPE.CAT:
            const catBreedData = petApiData.breedData as CatBreedData
            return [
               { attribute: "Pet Type", imgURL: paw_svg, info: "Cat" },
               { attribute: "Lifespan", imgURL: calendar_svg, info: catBreedData.lifespan + " years" },
               { attribute: "Weight", imgURL: weighing_scale_svg, info: catBreedData.weight + " kg" },
               { attribute: "Gender", imgURL: isMale ? male_svg : female_svg, info: isMale ? "Male" : "Female" }
            ]
         default:
            return []
      }
   }

   if (m_isLoading) { return <LoadingScreen /> }

   return (
      <main>
         <Navbar useSticky />{
            m_petApiData &&

            // SECTION - Full width of the page
            <section className='min-h-[50rem] text-center flex flex-col justify-start items-center'>

               {/* ---- BANNER IMAGE ---- */}
               <div style={{
                  backgroundImage: `url(${m_petApiData.imgURL})`
               }} className='w-full h-96 mb-margin-xl'></div>

               {/* --- BODY (constrained width) --- */}
               <div className='max-w-7xl mx-margin-l'>

                  {/* --- BODY (Description + Adoption Fee Box) ---- */}
                  <div className='flex flex-col md:flex-row'>

                     {/* --- DESCRIPTION CONTAINER --- */}
                     <div className='text-center flex-col items-start min-w-96 mb-margin-xl mr-margin-l'>

                        {/* ---- DESC HEADER ---- */}
                        <h1 className='font-bold text-3xl text-left mb-margin-xxs'>{m_petApiData.breedData?.breed.toUpperCase()}</h1>

                        {/* ---- DESCRIPTION ---- */}
                        <p className='text-left mb-margin-l text-lg'>{
                           m_petApiData.apiType === PET_API_TYPE.DOG ?
                              `${m_petApiData.breedData?.breed}'s are bred for ${(m_petApiData.breedData as DogBreedData).bredFor}` :
                              `${(m_petApiData.breedData as CatBreedData).description}`
                        }</p> 

                        {/* ---- PET ATTRIBUTES/INFO ----- */}
                        <div className=''>{
                           m_petApiData.breedData?.temperaments.map((temperament, idx) => {
                              return (
                                 <div key={idx} className='flex justify-start items-center mb-margin-m'>
                                    <img className='w-7 mr-margin-s' src={SVGs[Utils.randInt(0, SVGs.length - 1)]} alt="" />
                                    {/* <span className='mr-margin-xs'><strong>•</strong></span> */}
                                    <span className='text-left font-medium text-text-200'>{temperament}</span>
                                 </div>
                              )
                           })
                        }</div>

                        {/* ---- SEPARATOR ---- */}
                        <div
                           style={{ backgroundColor: "rgba(200, 200, 200, 0.8)" }}
                           className='h-[1px] my-margin-l w-full'>
                        </div>

                        {/* ---- ADDITIONAL DETAILS ----- */}
                        <div>
                           <h2 className='text-left text-2xl font-medium mb-text-xs'>Additional Details</h2>
                           <div className='grid grid-cols-2 lg:grid-cols-2 gap-4'>{
                              getAdditionalInfo(m_petApiData).map((petAttrib, idx) => {
                                 return (
                                    <AdditionalDetailCard
                                       key={idx} imgURL={petAttrib.imgURL}
                                       attribute={petAttrib.attribute} detail={petAttrib.info}
                                    />
                                 )
                              })
                           }</div>
                        </div>
                     </div>

                     {/* ----- ADOPTION FEE BOX ----- */}
                     <div className='
                     flex flex-col justify-center items-center rounded-xl shadow-lg
                     h-60 w-full md:max-w-96 text-center text-text-50 bg-white px-8 mb-margin-l
                  '>
                        <span className='text-xl font-medium mb-margin-m'>Adoption Fee</span>
                        <span className='text-3xl font-semibold mb-margin-xs'>
                           ${Utils.randFloat(100, 300).toFixed(2)}
                        </span>
                        <span className='text-sm font-light mb-margin-m'>Give a pet a home</span>
                        <button onClick={() => { m_navTo(ROUTE_URL.CHECKOUT) }} className='
                        text-text-950 font-semibold bg-accent-500 text-lg
                        hover:bg-accent-600 min-w-64 py-3 rounded-xl transition-colors duration-200
                     '>ADOPT ME</button>
                     </div>
                  </div>

                  {/* ---- SEPARATOR ---- */}
                  <div
                     style={{ backgroundColor: "rgba(200, 200, 200, 0.8)" }}
                     className='h-[1px] mb-margin-m w-full'>
                  </div>

                  {/* ---- VIEW OTHER ANIMALS ----- */}
                  <div className='mb-margin-l'>
                     <h2 className='text-left text-2xl font-medium mb-text-xs'>View more pets!</h2>
                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>{
                        m_morePets.map((petApiData, idx) => {
                           return <MorePetsCard key={idx} petApiData={petApiData} />
                        })
                     }</div>
                  </div>
               </div>
            </section>
         }<FooterSection />
      </main>
   )
}

export default PetDetailPage