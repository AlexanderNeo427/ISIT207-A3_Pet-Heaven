import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

export interface DropdownOption {
   optionName: string
   isChecked: boolean
}

interface DropdownProps {
   label: string

   options: DropdownOption[]
   setOptions: Dispatch<SetStateAction<DropdownOption[]>>
}

const Dropdown: React.FC<DropdownProps> = props => {
   const [m_isOpen, setIsOpen] = useState<boolean>(false)

   const onChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>, optionName: string): void => {
      props.setOptions(oldOptions => {
         const newOptions = [...oldOptions]
         const modifiedOption = newOptions.filter(op => op.optionName === optionName)[0]
         modifiedOption.isChecked = evt.target.checked
         return newOptions
      })
   }

   return (
      <div className='relative'>
         <span onClick={() => setIsOpen(isOpen => !isOpen)} className=''>{props.label}</span>
         <div style={{ scale: m_isOpen ? "1" : "0" }} className='absolute'>{
            props.options.map((option, idx) => {
               return (
                  <div key={idx} className=''>
                     <input
                        type="checkbox" checked={option.isChecked}
                        onChange={evt => onChangeHandler(evt, option.optionName)}
                     />
                     <span>{option.optionName}</span>
                  </div>
               )
            })
         }</div>
      </div>
   )
}

export default Dropdown