import React from 'react'

const FooterSection: React.FC = () => {
   return (
      <footer className='flex justify-center items-center bg-background-500'>
         <div className='flex flex-col justify-start items-center max-w-5xl'>

            {/* --- FOOTER TOP --- */}
            <div className='w-96 h-52 bg-black'>
               <p>Sign up for our newsletter</p>
               <input type="text" />
            </div>

            {/* ---- SEPARATOR ---- */}
            <div className='h-[1px] w-full bg-text-950'></div>

            {/* ---- FOOTER MIDDLE ---- */}
            <div className='w-96 h-52 bg-black'>
               <div>Quick Links</div>
               <div>LSKJflkjsDL</div>
               <div>Socials</div>
            </div>

            {/* ---- SEPARATOR ---- */}
            <div className='h-[1px] w-full bg-text-950'></div>
            
            {/* ---- FOOTER BOTTOM ---- */}
            <div className='w-96 h-52'>
               Copyright - All rights reserved
            </div>
         </div>
      </footer>
   )
}

export default FooterSection