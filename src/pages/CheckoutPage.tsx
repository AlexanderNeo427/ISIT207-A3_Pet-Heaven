import React, { HTMLInputTypeAttribute } from 'react'

interface CheckoutInputFieldProps {
   labelText: string
   inputType: HTMLInputTypeAttribute
   placeholderText?: string
}

const CheckoutInput: React.FC<CheckoutInputFieldProps> = props => {
   return (
      <>
         <label className='flex flex-col items-start'>
            <span className='mb-text-xxs'>{props.labelText}</span>
            <input
               type={props.inputType} placeholder={props.placeholderText || ""}
               className='
                  w-full h-10 px-4 focus:outline-none 
                  border-gray-300 border-[1px] rounded-lg bg-transparent
               ' />
         </label>
      </>
   )
}

const CheckoutPage: React.FC = () => {
   return (
      <main className='bg-primary-800'>
         <section className='min-h-96 flex flex-col justify-center items-center'>

            <form className='
               flex flex-col justify-start items-start mx-margin-xxs
               py-margin-l min-w-80 max-w-[40rem] w-full
            '>

               {/* ---- ADOPTER INFORMATION ---- */}
               <div className='bg-white rounded-lg shadow-lg p-8 flex flex-col gap-6 mb-margin-l w-full'>
                  <h2 className='text-2xl font-semibold'>Adopter Information</h2>
                  <CheckoutInput labelText='First name' inputType='text' />
                  <CheckoutInput labelText='Last name' inputType='text' />
               </div>

               {/* ---- PAYMENT INFORMATION ---- */}
               <div className='bg-white rounded-lg shadow-xl p-8 flex flex-col gap-6 mb-margin-l w-full'>
                  <h2 className='text-2xl font-semibold'>Payment Details</h2>
                  <CheckoutInput labelText='Card No.' inputType='text' />
                  <CheckoutInput labelText='Name on credit card' inputType='text' />
                  <CheckoutInput labelText='Card Expiration' inputType='text' />
                  <CheckoutInput labelText='CVV' inputType='text' />
               </div>

               {/* ---- CONTACT INFORMATION ---- */}
               <div className='bg-white rounded-lg shadow-xl p-8 flex flex-col gap-6 mb-margin-l w-full'>
                  <h2 className='text-2xl font-semibold'>Contact Info</h2>
                  <CheckoutInput labelText='Email' inputType='text' />
                  <CheckoutInput labelText='Contact No' inputType='text' />
               </div>
            </form>
         </section>
      </main>
   )
}

export default CheckoutPage