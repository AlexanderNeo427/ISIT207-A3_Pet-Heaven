import React from 'react'

const FooterSection: React.FC = () => {
   return (
      <footer className='flex justify-center items-center bg-accent-50'>
         <div className='flex flex-col justify-start items-center w-full max-w-5xl text-text-950'>

            {/* --- FOOTER TOP --- */}
            <div className='max-w-4xl w-full'>
               <div className='
                  flex flex-col justify-start items-start px-8 py-5
                  md:flex-row md:justify-between md:items-center
               '>
                  <div className='flex flex-col justify-start items-start mb-margin-m md:mb-0'> 
                     <span className='text-2xl font-semibold'>Want to stay updated?</span>
                     <span className='text-base'>Subscribe to our mailing list</span>
                  </div>
                  <div className='flex justify-start items-center text-sm'>
                     <input className='rounded-3xl px-4 w-40 h-9 mr-margin-xs' type="email" placeholder='Email' />
                     <button className='rounded-3xl px-6 h-9 bg-primary-500'>Subscribe</button>
                  </div>
               </div>
            </div>

            {/* ---- SEPARATOR ---- */}
            <div className='h-[1px] w-full bg-text-950 px-12'></div>

            {/* ---- FOOTER MIDDLE ---- */}
            <div className='w-full max-w-4xl my-margin-m'>
               <div className='
                  flex flex-col justify-between items-start gap-4 mx-margin-m
                  md:flex-row 
               '>
                  <div className='flex flex-col justify-start items-start'>
                     <span className='text-lg font-semibold mb-text-xxs'>Quick Links</span>
                     <a href="">Home</a>
                     <a href="">About Us</a>
                     <a href="">Services</a>
                     <a href="">Contact Us</a>
                  </div>
                  <div className='flex flex-col justify-start items-start'>
                     <span className='text-lg font-semibold mb-text-xxs'>Working Hours</span>
                     <span>Mon - Fri</span>
                     <span>9am - 6pm</span>
                     <span>Weekends</span>
                     <span>10am - 8pm</span>
                  </div>
                  <div className=''>
                     <span className='text-lg font-semibold mb-text-xxs'>Socials</span>
                     <div className='flex gap-3'>
                        <a href="">Instagram</a>
                        <a href="">Facebook</a>
                        <a href="">Twitter/X</a>
                        <a href="">TikTok</a>
                     </div>
                  </div>
               </div>
            </div>

            {/* ---- SEPARATOR ---- */}
            <div className='h-[1px] w-full bg-text-950 px-12'></div>

            {/* ---- FOOTER BOTTOM ---- */}
            <div className='max-w-4xl'>
               <span className='flex justify-center items-center text-center text-sm my-margin-m'>
                  Copyright - All rights reserved
               </span>
            </div>
         </div>
      </footer>
   )
}

export default FooterSection