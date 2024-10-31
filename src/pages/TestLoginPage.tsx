import React from "react"
import { useNavigate } from "react-router-dom"
import { firebaseAuth, googleAuthProvider } from "../FirebaseConfig"
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth"

const TestLoginPage: React.FC = () => {
   const [m_username, setUsername] = React.useState<string>("")
   const [m_password, setPassword] = React.useState<string>("")

   const navTo = useNavigate()

   const normalSignup = async (evt: React.MouseEvent) => {
      evt.preventDefault()

      createUserWithEmailAndPassword(firebaseAuth, m_username, m_password)
         .then(userCred => {
            console.log("user cred: ", userCred)
            console.log("Create user successfull, re-directing...")
            setTimeout(() => navTo("/home"), 3000)
         })
         .catch(err => {
            console.log("Failed to sign in, error: ", err.message)
         })
   }

   const normalLogin = async (evt: React.MouseEvent) => {
      evt.preventDefault()

      signInWithEmailAndPassword(firebaseAuth, m_username, m_password)
         .then(userCred => {
            console.log("user cred: ", userCred)
            console.log("Sign in successfull, re-directing...")
            setTimeout(() => navTo("/home"), 3000)
         })
         .catch(err => {
            console.log("Failed to sign in, error: ", err.message)
         })
   }

   const googleLogin = async (evt: React.MouseEvent) => {
      evt.preventDefault()

      signInWithPopup(firebaseAuth, googleAuthProvider)
         .then(res => {
            console.log("Sign in success!")
            console.log("Credentials", GoogleAuthProvider.credentialFromResult(res))
            console.log("User: ", res.user)
         }).catch(err => {
            console.log("Sign in error!")
            console.log(err.message)
            console.log("Email: ", err.customData.email)
            console.log("Credential: ", GoogleAuthProvider.credentialFromError(err))
         })
   }

   return (
      <form className="flex gap-5 mt-10 flex-col justify-center items-center w-full h-full">
         <input value={m_username} onChange={evt => setUsername(evt.target.value)} type="text" placeholder="username" />
         <input value={m_password} onChange={evt => setPassword(evt.target.value)} type="text" placeholder="password" />
         <button onClick={normalLogin}>Normal Login</button>
         <button onClick={normalSignup}>Normal Sign Up</button>
         <button onClick={googleLogin}>Login Via Google</button>
      </form>
   )
}

export default TestLoginPage