import React, { useEffect, useRef, useState } from 'react'

import tick_svg from '../assets/SVG/tick.svg'
import email_svg from '../assets/SVG/email.svg'
import fingerprint_svg from '../assets/SVG/fingerprint.svg'
import clock_svg from '../assets/SVG/clock.svg'
import { Link, useNavigate } from 'react-router-dom'
import { ROUTE_URL, Utils } from '../others/Globals'

const ReceiptPage: React.FC = () => {
   const [m_navigateFlag, setNavigateFlag] = useState<boolean>(false)
   const [m_timeLeft, setTimeLeft] = useState<number>(12)
   const m_timerHandle = useRef<NodeJS.Timeout>()
   const m_orderID = useRef<string>(Utils.generateRandomString(10))
   const m_navTo = useNavigate()

   const tryDecrementTimer = () => {
      if (m_timerHandle && m_timerHandle.current) {
         clearTimeout(m_timerHandle.current)
      }
      setTimeLeft(timeLeft => {
         const timeNext = timeLeft - 1
         if (timeNext <= 0) {
            setNavigateFlag(true)
         }
         m_timerHandle.current = setTimeout(() => tryDecrementTimer(), 1000)
         return timeNext
      })
   }

   useEffect(() => {
      if (m_timerHandle && m_timerHandle.current) {
         clearTimeout(m_timerHandle.current)
      }
      tryDecrementTimer()
      return () => clearTimeout(m_timerHandle.current)
   }, [])

   useEffect(() => {
      if (m_navigateFlag) { m_navTo(ROUTE_URL.HOME) }
   }, [m_navigateFlag])

   return (
      <main className='h-screen w-screen bg-primary-800 flex justify-center items-center'>

         {/* --- CONFIRMATION CONTAINER --- */}
         <div className='
            w-full h-full sm:max-w-2xl lg:max-w-3xl sm:max-h-[80%] flex flex-col shadow-xl rounded-t-xl
         '>

            {/* --- HEADER --- */}
            <div className='w-full bg-accent-500 flex flex-col justify-start items-center px-11 py-10 rounded-t-xl'>
               {/* <div>
                  <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120"
                     preserveAspectRatio="none">
                     <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        className="shape-fill"></path>
                  </svg>
               </div> */}
               <img className='w-32 h-32 mb-margin-s' src={tick_svg} />
               <h1 className='text-text-950 font-semibold text-4xl'>Adoption Success!</h1>
            </div>

            {/* --- DETAILS ---- */}
            <div className='w-full h-full flex justify-center items-center bg-background-900'>
               <div className='
                  w-[70%] h-[80%] flex flex-col justify-start items-start text-text-50 px-10 py-8 
               '>
                  <h2 className='text-3xl font-medium mb-margin-m'>
                     Pickup ID: <strong className='underline underline-offset-4'>{'#' + m_orderID.current}</strong>
                  </h2>

                  <div className='flex justify-start items-center mb-margin-s'>
                     <img className='w-10 h-10 mr-margin-m' src={email_svg} />
                     <p className='font-medium text-lg text-text-50'>An email will be sent to you with the adoption details</p>
                  </div>

                  <div className='flex justify-start items-center mb-margin-s'>
                     <img className='w-10 h-10 mr-margin-m' src={clock_svg} />
                     <p className='font-medium text-lg text-text-50'>Be sure to arrive on time to collect your pet</p>
                  </div>

                  <div className='flex justify-start items-center mb-margin-2xl'>
                     <img className='w-10 h-10 mr-margin-m' src={fingerprint_svg} />
                     <p className='font-medium text-lg text-text-50'>Be sure to bring your Pickup ID</p>
                  </div>

                  <span>
                     <i>
                        You will be automatically re-directed to the
                        <Link to={ROUTE_URL.HOME} className='underline'> home page </Link>
                        in {m_timeLeft} seconds
                     </i>
                  </span>
               </div>
            </div>

         </div>
      </main>
   )
}

export default ReceiptPage