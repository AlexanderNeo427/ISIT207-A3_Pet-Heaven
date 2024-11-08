import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import { CatBreedData, DogBreedData, PET_API_TYPE, PetApiData, ROUTE_URL, Utils } from '../others/Globals'
import { useNavigate, useSearchParams } from 'react-router-dom'
import calendar_svg from '../assets/SVG/calendar.svg'
import ruler_svg from '../assets/SVG/ruler.svg'
import weighing_scale_svg from '../assets/SVG/weighing_scale.svg'
import paw_svg from '../assets/SVG/paw.svg'
import axios from 'axios'
import LoadingScreen from '../components/LoadingScreen'
import AdditionalDetailCard from '../components/AdditionalDetailCard'
import { LoremIpsum } from 'lorem-ipsum'

const PetDetailPage: React.FC = () => {
   const [m_isLoading, setIsLoading] = useState<boolean>(true)
   const [m_petApiData, setPetApiData] = useState<PetApiData>()
   const m_searchParams = useSearchParams()[0]
   const m_navTo = useNavigate()

   useEffect(() => {
      const pet_type = m_searchParams.get('pet_type')
      const pet_id = m_searchParams.get('pet_id')
      const breed_id = m_searchParams.get('breed_id')

      const imgEndpointURL = pet_type === "dog" ?
         `https://api.thedogapi.com/v1/images/${pet_id}` :
         `https://api.thecatapi.com/v1/images/${pet_id}`

      const breedEndpointURL = pet_type === 'dog' ?
         `https://api.thedogapi.com/v1/breeds/${breed_id}` :
         `https://api.thecatapi.com/v1/breeds/${breed_id}`

      const fetchPetApiData = async (): Promise<void> => {
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
               imgData.id, imgData.url, breedData, imgData.height, imgData.width,
               pet_type === "dog" ? PET_API_TYPE.DOG : PET_API_TYPE.CAT
            )
            setPetApiData(petApiData)
            setIsLoading(false)
         }
         catch (err: any) {
            console.log("Error fetching from Pet API: ", err.message)
         }
      }
      fetchPetApiData()
   }, [])

   interface PetAttribute {
      attribute: string
      imgURL: string
      info: string
   }

   // const formatTemperaments = (temperaments: string[]): string => {
   //    const MAX_LENGTH = 30
   //    let displayStr = ""
   //
   //    for (let i = 0; i < temperaments.length; i++) {
   //       const newStr = displayStr + temperaments[i]
   //       if (newStr.length > MAX_LENGTH) {
   //          displayStr.padEnd(MAX_LENGTH, ".")
   //          console.log(displayStr)
   //          return displayStr
   //       }
   //       displayStr = newStr
   //       if (i < temperaments.length - 1) {
   //          displayStr += ", "
   //       }
   //    }
   //    console.log(displayStr)
   //    return displayStr
   // }

   const getAdditionalInfo = (petApiData: PetApiData): PetAttribute[] => {

      switch (petApiData.apiType) {
         case PET_API_TYPE.DOG:
            const dogBreedData = petApiData.breedData as DogBreedData
            return [
               { attribute: "Pet Type", imgURL: paw_svg, info: "Dog" },
               { attribute: "Lifespan", imgURL: calendar_svg, info: dogBreedData.lifespan },
               { attribute: "Height", imgURL: ruler_svg, info: dogBreedData.height + " cm" },
               { attribute: "Weight", imgURL: weighing_scale_svg, info: dogBreedData.weight + " kg" },
            ]
         case PET_API_TYPE.CAT:
            const catBreedData = petApiData.breedData as CatBreedData
            return [
               { attribute: "Pet Type", imgURL: paw_svg, info: "Cat" },
               { attribute: "Lifespan", imgURL: calendar_svg, info: catBreedData.lifespan + " years" },
               { attribute: "Weight", imgURL: weighing_scale_svg, info: catBreedData.weight + " kg" }
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

                        {
                           (() => {
                              const numParagraphs = Utils.randInt(1, 4)
                              for (let i = 0; i < numParagraphs; i++) {
                                 return (
                                    <p className='text-left mb-margin-l text-lg'>{
                                       new LoremIpsum().generateParagraphs(Utils.randInt(1, 3))
                                    }</p>
                                 )
                              }
                              return <></>
                           })() 
                        }
                        <p className='text-left mb-margin-l text-lg'>{
                           new LoremIpsum({
                              sentencesPerParagraph: { min: 2, max: 5 },
                              wordsPerSentence: { min: 4, max: 16 }
                           }).generateParagraphs(Utils.randInt(1, 3))
                        }</p>

                        {/* ---- PET ATTRIBUTES/INFO ----- */}
                        <div className=''>{
                           getAdditionalInfo(m_petApiData).map((petAttrib, idx) => {
                              return (
                                 <div key={idx} className='flex justify-start items-center mb-margin-m'>
                                    <img className='w-7 mr-margin-s' src={petAttrib.imgURL} alt="" />
                                    <span className='mr-text-xxs'><strong>{petAttrib.attribute}</strong></span>
                                    <span className='mr-margin-xs'><strong>•</strong></span>
                                    <span className='text-left font-medium text-text-200'>{petAttrib.info}</span>
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
                        <span className='text-3xl font-semibold mb-margin-xs'>$150.0</span>
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
                     <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                        <div className='w-full min-h-52 bg-white rounded-lg shadow-lg'></div>
                     </div>
                  </div>
               </div>
            </section>
         }<FooterSection />
      </main>
   )
}

export default PetDetailPage