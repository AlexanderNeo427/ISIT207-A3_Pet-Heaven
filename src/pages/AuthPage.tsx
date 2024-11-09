import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import FooterSection from '../components/sections/FooterSection'
import login_img from "../assets/images/golden_retriever.jpg"
import signup_img from "../assets/images/golden_retriever_2.jpg"
import { motion as framer, useWillChange } from 'framer-motion'
import AuthInput from '../components/AuthInput'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { firebaseAuth, googleAuthProvider } from '../others/FirebaseConfig'
import google_icon from '../assets/images/google_icon.png'
import { useNavigate } from 'react-router-dom'
import { ROUTE_URL } from '../others/Globals'

export enum INPUT_ID {
   LOGIN_EMAIL,
   LOGIN_PASSWORD,
   SIGNUP_EMAIL,
   SIGNUP_PASSWORD,
   SIGNUP_CONFIRM_PASSWORD
}

export interface InputData {
   [inputID: number]: string
}

const AuthPage: React.FC = () => {
   const [m_loginMode, setLoginMode] = useState<boolean>(true)
   const [m_isAnimating, setIsAnimating] = useState<boolean>(false)
   const [m_inputData, setInputData] = useState<InputData>({})

   const m_navTo = useNavigate()
   const m_willChange = useWillChange()

   const ROTATION_TIME_MS = 600

   const toggleClickHandler = (evt: React.MouseEvent) => {
      evt.preventDefault()

      if (!m_isAnimating) {
         setIsAnimating(true)
         setTimeout(() => {
            setLoginMode(prev => !prev)
            setIsAnimating(false)
         }, ROTATION_TIME_MS)
      }
   }

   const loginHandler = async (_: React.MouseEvent): Promise<void> => {
      const email = m_inputData[INPUT_ID.LOGIN_EMAIL]
      const pwd = m_inputData[INPUT_ID.LOGIN_PASSWORD]

      signInWithEmailAndPassword(firebaseAuth, email, pwd)
         .then(_ => {
            setTimeout(() => m_navTo(ROUTE_URL.GALLERY), 1500)
         })
         .catch(err => {
            console.log("Unable to log the user in, exited with error code: ", err.code)
            console.log("Error message: ", err.message)
         })
   }

   const googleLoginHandler = async (): Promise<void> => {
      signInWithPopup(firebaseAuth, googleAuthProvider)
         .then(_ => {
            setTimeout(() => m_navTo(ROUTE_URL.GALLERY), 1500)
         })
         .catch(err => {
            console.log("Unable to log the user in, exited with error code: ", err.code)
            console.log("Error message: ", err.message)
         })
   }

   const signupHandler = async (_: React.MouseEvent): Promise<void> => {
      const email = m_inputData[INPUT_ID.SIGNUP_EMAIL]
      const pwd = m_inputData[INPUT_ID.SIGNUP_PASSWORD]
      const confirmPwd = m_inputData[INPUT_ID.SIGNUP_CONFIRM_PASSWORD]

      if (pwd !== confirmPwd) {
         console.log("Passwords do not match")
         return
      }

      createUserWithEmailAndPassword(firebaseAuth, email, pwd)
         .then(userCreds => {
            console.log("Successfully signed up the user: ", userCreds.user, ". Proceed to sign in")
         })
         .catch(err => {
            console.log("Unable to sign up with credentials, exited with error code: ", err.code)
            console.log("Error message: ", err.message)
         })
   }

   return (
      <main>
         <Navbar useSticky={true} />
         <framer.section
            style={{ willChange: m_willChange }}
            variants={{
               default: { rotateY: 0 },
               rotated: { rotateY: 89 }
            }}
            animate={m_isAnimating ? 'rotated' : 'default'}
            transition={{ duration: ROTATION_TIME_MS / 1000 }}
            className='flex justify-center items-center'>
            <div
               style={{ perspective: '300px', transformStyle: 'preserve-3d' }}
               className='
                  flex justify-between items-center rounded-2xl 
                  bg-white shadow-xl my-margin-2xl h-[36rem]
                  md:max-w-3xl xl:max-w-4xl xl:h-[42rem]
            '>
               <div
                  style={{ backgroundImage: `url(${m_loginMode ? login_img : signup_img})` }}
                  className='hidden md:block bg-cover h-full w-[99rem] rounded-l-2xl'>
               </div>

               <form onSubmit={e => e.preventDefault()} className='flex justify-center items-center min-w-[28rem] xl:min-w-[34rem] px-10'>
                  <div className='w-full flex flex-col justify-start items-center'>
                     {<button onClick={toggleClickHandler}
                        className='mb-margin-xl'>
                        {m_loginMode ? "Switch to sign up" : "Switch to login"}
                     </button>}
                     {m_loginMode ?
                        <>
                           <h2 className='font-bold text-3xl mb-text-m'>LOGIN</h2>
                           <AuthInput inputID={INPUT_ID.LOGIN_EMAIL} inputType='email' placeholder='Email' inputData={m_inputData} setInputData={setInputData} />
                           <AuthInput inputID={INPUT_ID.LOGIN_PASSWORD} inputType='password' placeholder='Password' inputData={m_inputData} setInputData={setInputData} />
                           <button onClick={loginHandler} className='
                              w-full py-3 rounded-lg transition-colors text-text-950 font-semibold text-lg
                              bg-accent-500 hover:bg-accent-600 mb-margin-l
                           '>Login</button>
                        </>
                        :
                        <>
                           <h2 className='font-bold text-3xl mb-text-m'>SIGN UP</h2>
                           <AuthInput inputID={INPUT_ID.SIGNUP_EMAIL} inputType='email' placeholder='Email' inputData={m_inputData} setInputData={setInputData} />
                           <AuthInput inputID={INPUT_ID.SIGNUP_PASSWORD} inputType='password' placeholder='Password' inputData={m_inputData} setInputData={setInputData} />
                           <AuthInput inputID={INPUT_ID.SIGNUP_CONFIRM_PASSWORD} inputType='password' inputData={m_inputData} placeholder='Confirm Password' setInputData={setInputData} />
                           <button onClick={signupHandler} className='
                              w-full py-3 rounded-lg transition-colors bg-primary-500 hover:bg-primary-600 mb-margin-l
                           '>Sign up</button>
                        </>}
                     {
                        m_loginMode &&
                        <>
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

                           {/* --- ALTERNATIVE SIGN-INS --- */}
                           <div className='w-full flex justify-center text-sm gap-4'>
                              <button onClick={googleLoginHandler} className='
                                 flex justify-center items-center h-11 rounded-lg bg-background-900
                                 hover:bg-background-800 transition-colors duration-200 w-full
                              '>
                                 <img className='w-5 h-5 mr-margin-s' src={google_icon} alt="" />
                                 <span>Google</span>
                              </button>
                           </div>
                        </>
                     }
                  </div>
               </form>
            </div>
         </framer.section>
         <FooterSection />
      </main>
   )
}

export default AuthPage