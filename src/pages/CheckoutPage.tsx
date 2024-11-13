import React, { HTMLInputTypeAttribute } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import { useNavigate } from 'react-router-dom'
import { ROUTE_URL } from '../others/Globals'

interface CheckoutInputFieldProps {
   inputType: HTMLInputTypeAttribute
   placeholderText?: string
}

const CheckoutInput: React.FC<CheckoutInputFieldProps> = props => {
   return (
      <label className='flex flex-col items-start'>
         <input
            type={props.inputType} placeholder={props.placeholderText || ""}
            className='w-full px-4 py-3 mb-margin-s rounded-lg bg-gray-200 focus:outline-none'
         />
      </label>
   )
}

const CheckoutPage: React.FC = () => {
   const m_navTo = useNavigate()

   return (
      <main className='bg-primary-950'>
         <Navbar useSticky />
         <section className='min-h-96 flex flex-col justify-center items-center'>
            <form className='
               flex flex-col justify-start items-start mx-margin-xxs
               py-margin-l min-w-80 max-w-[40rem] w-full
            '>
               {/* ---- ADOPTER INFORMATION ---- */}
               <div className='bg-white rounded-lg shadow-lg p-8 flex flex-col gap-1 mb-margin-l w-full'>
                  <h2 className='text-2xl font-semibold mb-margin-s'>Adopter Information</h2>
                  <CheckoutInput placeholderText='First name' inputType='text' />
                  <CheckoutInput placeholderText='Last name' inputType='text' />
               </div>

               {/* ---- PAYMENT INFORMATION ---- */}
               <div className='bg-white rounded-lg shadow-xl p-8 flex flex-col gap-1 mb-margin-l w-full'>
                  <h2 className='text-2xl font-semibold mb-margin-s'>Payment Details</h2>
                  <CheckoutInput placeholderText='Card No.' inputType='text' />
                  <CheckoutInput placeholderText='Name on credit card' inputType='text' />
                  <CheckoutInput placeholderText='Card Expiration' inputType='text' />
                  <CheckoutInput placeholderText='CVV' inputType='text' />
               </div>

               {/* ---- CONTACT INFORMATION ---- */}
               <div className='bg-white rounded-lg shadow-xl p-8 flex flex-col gap-1 mb-margin-xl w-full'>
                  <h2 className='text-2xl font-semibold mb-margin-s'>Contact Info</h2>
                  <CheckoutInput placeholderText='Email' inputType='text' />
                  <CheckoutInput placeholderText='Contact No' inputType='text' />
               </div>

               <button onClick={() => m_navTo(ROUTE_URL.RECEIPT)} className='
                  w-full py-3 bg-secondary-500 hover:bg-secondary-600 transition-colors
                  text-2xl font-semibold text-text-950 rounded-xl mb-margin-xl
               '>Adopt!</button>
            </form>
         </section>
         <FooterSection />
      </main>
   )
}

export default CheckoutPage