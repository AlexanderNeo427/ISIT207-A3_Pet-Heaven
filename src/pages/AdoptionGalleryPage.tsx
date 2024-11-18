import React, { useContext, useEffect, useRef, useState } from 'react'
import { PetApiData, ROUTE_URL, Utils } from '../others/Globals'
import search_icon from '../assets/SVG/search.svg'
import Navbar from '../components/Navbar'
import PetInfoCard from '../components/PetInfoCard'
import FooterSection from '../components/sections/FooterSection'
import Dropdown, { DropdownOption } from '../components/Dropdown'
import { AuthContext } from '../common/AuthContext'
import { useNavigate } from 'react-router-dom'

const AdoptionGalleryPage: React.FC = () => {
   const m_authCtx = useContext(AuthContext)
   const m_navTo = useNavigate()

   const m_loadCount = useRef<number>(-1)
   const [m_loadingCardsShown, setLoadingCardsShown] = useState<boolean>(true)
   const [m_petData, setPetData] = useState<PetApiData[]>([])

   const [m_searchInput, setSearchInput] = useState<string>("")
   const [m_petTypeDropdown, setPetTypeDropdown] = useState<DropdownOption[]>([])
   const [m_agesDropdown, setAgesDropdown] = useState<DropdownOption[]>([])
   const [m_sizesDropdown, setSizesDropdown] = useState<DropdownOption[]>([])

   const fetchPetApiData = async (numCards: number): Promise<void> => {
      m_loadCount.current = numCards
      setLoadingCardsShown(true)

      const freshPetData = await Utils.getBatchPetAPIData(numCards)
      Utils.durstenfeldShuffle(freshPetData)
      setPetData(oldPetData => [...oldPetData, ...freshPetData])
      setLoadingCardsShown(false)
   }

   useEffect(() => {
      // Not logged in? Re-direct to auth page first
      if (m_authCtx && !m_authCtx.firebaseUser)  {
         m_navTo(ROUTE_URL.AUTH)
      }

      setPetTypeDropdown([
         { optionName: "Dog", isChecked: true },
         { optionName: "Cat", isChecked: true },
         { optionName: "All", isChecked: true }
      ])
      setAgesDropdown([
         { optionName: "Baby", isChecked: true },
         { optionName: "Young", isChecked: true },
         { optionName: "Adult", isChecked: true },
         { optionName: "Senior", isChecked: true }
      ])
      setSizesDropdown([
         { optionName: "Extra Small", isChecked: true },
         { optionName: "Small", isChecked: true },
         { optionName: "Medium", isChecked: true },
         { optionName: "Large", isChecked: true },
         { optionName: "Large", isChecked: true }
      ])

      fetchPetApiData(20)
   }, [])

   const showLoadingCards = (cardCount: number): JSX.Element[] => {
      const arr = Array.from({ length: cardCount })
      return arr.map((_, idx) => {
         return (
            <div
               key={idx} style={{ height: `${Utils.randInt(16, 23)}rem` }}
               className='w-full min-w-64 bg-gray-300 animate-pulse rounded-lg shadow-lg mb-4'>
            </div>
         )
      })
   }

   return (
      <main>
         <Navbar useSticky={true} />
         <section className='flex justify-center items-center py-margin-xl px-margin-s'>
            <div className='flex'>

               {/* ---- DROPDOWN CONTAINER ---- */}
               <div className='mr-margin-m'>
                  <Dropdown
                     label='Gender' options={m_petTypeDropdown}
                     setOptions={setPetTypeDropdown}
                  />
               </div>

               <div className='mr-margin-m'>
                  <Dropdown
                     label='Sizes' options={m_sizesDropdown}
                     setOptions={setSizesDropdown}
                  />
               </div>

               <div className='mr-margin-m'>
                  <Dropdown
                     label='Ages' options={m_agesDropdown}
                     setOptions={setAgesDropdown}
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

         <section className='min-h-96 flex flex-col justify-center items-center'>
            <div className='max-w-6xl mx-margin-s columns-2 md:columns-3 2xl:columns-4 my-margin-l'>
               {m_petData.map(data => <PetInfoCard key={data.id} petApiData={data} />)}
               {m_loadingCardsShown && showLoadingCards(m_loadCount.current)}
            </div>
            {
               !m_loadingCardsShown &&
               <button onClick={() => fetchPetApiData(12)} className='
                  w-56 h-12 bg-accent-500 my-margin-xl rounded-lg 
                  text-text-950 font-medium hover:bg-accent-600 transition-colors
               '>Load more</button>
            }
         </section>
         <FooterSection />
      </main>
   )
}

export default AdoptionGalleryPage