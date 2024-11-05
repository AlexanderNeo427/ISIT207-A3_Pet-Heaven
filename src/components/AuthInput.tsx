import React, { Dispatch } from 'react'
import { INPUT_ID, InputData } from '../pages/AuthPage'

interface AuthInputProps {
   inputID: INPUT_ID
   inputType: React.HTMLInputTypeAttribute
   placeholder: string

   inputData: InputData
   setInputData: Dispatch<React.SetStateAction<InputData>>
}

const AuthInput: React.FC<AuthInputProps> = props => {
   const onChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
      props.setInputData(oldInputData => {
         const newInputData = { ...oldInputData }
         newInputData[props.inputID] = evt.target.value
         return newInputData
      })
   }

   return (
      <input
         onChange={onChangeHandler} value={props.inputData[props.inputID] || ''}
         className='w-full px-4 py-3 mb-margin-s rounded-lg bg-gray-200 focus:outline-none'
         type={props.inputType} placeholder={props.placeholder}
      />
   )
}

export default AuthInput