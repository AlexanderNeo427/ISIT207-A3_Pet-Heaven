import React, { useEffect, useState } from 'react'
import { PetApiData, Utils } from '../others/Globals'
import search_icon from '../assets/SVG/search.svg'
import Navbar from '../components/Navbar'
import PetInfoCard from '../components/PetInfoCard'
import FooterSection from '../components/sections/FooterSection'
import Select from 'react-select'

const AdoptionGalleryPage: React.FC = () => {
   const [m_petData, setPetData] = useState<PetApiData[]>([])
   const [m_searchInput, setSearchInput] = useState<string>("")

   useEffect(() => {
      const fetchPetApiData = async (): Promise<void> => {
         const allPetData = await Utils.getBatchPetAPIData(10)
         Utils.durstenfeldShuffle(allPetData)
         setPetData(allPetData)
      }
      fetchPetApiData()
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
                  <input
                     value={m_searchInput} onChange={evt => setSearchInput(evt.target.value)}
                     className='bg-transparent w-full focus:outline-none' type="text"
                  />
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