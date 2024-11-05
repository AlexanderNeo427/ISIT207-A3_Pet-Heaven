import React, { useEffect, useRef, useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import banner_img from "../assets/images/golden_retriever.jpg"

const AuthPage: React.FC = () => {
   const [m_loginMode, setLoginMode] = useState<boolean>(true)
   const heightRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      console.log("Height: ", heightRef.current?.offsetHeight) 
   }, [heightRef.current])

   return (
      <main>
         <Navbar useSticky={true} />
         <section ref={heightRef} className='min-h-[32rem] flex justify-center items-center'>
            <div className='
               flex flex-row justify-start items-center 
               rounded-lg bg-white shadow-lg my-margin-2xl max-h-[35rem]
               sm:max-w-xl md:max-w-2xl lg:max-w-4xl overflow-hidden
            '>
               <img
                  style={{ height: heightRef.current?.offsetHeight }}
                  className='hidden md:block object-cover w-[45%]'
                  src={banner_img} alt=""
               />

               <form className='flex-grow flex justify-center items-center px-10 py-12'>
                  <div className='w-full max-w-96 flex flex-col justify-start items-center'>
                     {
                        <button onClick={e => {
                           e.preventDefault()
                           setLoginMode(prev => !prev)
                        }}
                           className='mb-margin-xl'>
                           {m_loginMode ? "Switch to sign up" : "Switch to login"}
                        </button>
                     }
                     {
                        m_loginMode ?
                           <>
                              <h2 className='font-bold text-3xl mb-text-m'>LOGIN</h2>
                              <input
                                 className='w-full px-4 py-3 mb-margin-s rounded-lg bg-gray-200 focus:outline-none'
                                 type="email" placeholder='Email'
                              />
                              <input
                                 className='w-full px-4 py-3 mb-margin-s rounded-lg bg-gray-200 focus:outline-none'
                                 type="password" placeholder='Password'
                              />
                              <button className='
                                 w-full py-3 rounded-lg transition-colors bg-primary-500 hover:bg-primary-300 mb-margin-m
                              '>Login</button>
                           </>
                           :
                           <>
                              <h2 className='font-bold text-3xl mb-text-m'>SIGN UP</h2>
                              <input
                                 className='w-full px-4 py-3 mb-margin-s rounded-lg bg-gray-200 focus:outline-none'
                                 type="email" placeholder='Email'
                              />
                              <input
                                 className='w-full px-4 py-3 mb-margin-s rounded-lg bg-gray-200 focus:outline-none'
                                 type="password" placeholder='Password'
                              />
                              <input
                                 className='w-full px-4 py-3 mb-margin-s rounded-lg bg-gray-200 focus:outline-none'
                                 type="password" placeholder='Confirm password'
                              />
                              <button className='
                                 w-full py-3 rounded-lg transition-colors bg-primary-500 hover:bg-primary-300 mb-margin-m
                              '>Sign up</button>
                           </>
                     }
                     <div className='flex justify-between w-full mb-margin-s text-sm'>
                        <div className='flex justify-center'>
                           <input type="checkbox" name="" id="" />
                           <span className='ml-margin-xxs'>Remember Me</span>
                        </div>
                        <a href="">Forgot your password?</a>
                     </div>

                     <div className='w-full flex justify-between items-center h-5 mb-margin-l text-gray-400'>
                        <div className='w-full h-[1px] bg-gray-400'></div>
                        <span className='text-sm min-w-28 text-center'>Or sign-in with</span>
                        <div className='w-full h-[1px] bg-gray-400'></div>
                     </div>

                     <div className='w-full flex justify-around'>
                        <button>X</button>
                        <button>G</button>
                        <button>L</button>
                     </div>
                  </div>
               </form>
            </div>
         </section>
         <FooterSection />
      </main>
   )
}

export default AuthPage