import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

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
   const dropdownRef = useRef<HTMLDivElement>(null)

   const windowClickListener = (evt: MouseEvent): void => {
      if (!m_isOpen || !dropdownRef.current ||
         dropdownRef.current.contains(evt.target as Node)
      ) { return }
      setIsOpen(false)
   }

   useEffect(() => {
      document.addEventListener('mousedown', windowClickListener)
      return () => document.removeEventListener('mousedown', windowClickListener)
   }, [m_isOpen])

   const onChangeHandler = (evt: React.ChangeEvent<HTMLInputElement>, optionName: string): void => {
      props.setOptions(oldOptions => {
         const newOptions = [...oldOptions]
         const modifiedOption = newOptions.filter(op => op.optionName === optionName)[0]
         modifiedOption.isChecked = evt.target.checked
         return newOptions
      })
   }

   return (
      <div ref={dropdownRef} className='relative'>
         <button
            onClick={() => setIsOpen(isOpen => !isOpen)}
            className='
               px-4 h-10 rounded-lg text-lg text-text-300
               outline outline-1 outline-gray-300 shadow-lg bg-white
               hover:outline-black transition-all duration-200
         '>{props.label}</button>
         <div
            style={{ scale: m_isOpen ? "1" : "0" }}
            className='
               absolute outline outline-1 outline-gray-300 z-10
               min-w-56 bg-white mt-margin-xxs rounded-lg shadow-lg 
               pt-margin-l pl-margin-l pb-margin-m pr-margin-l
         '>{
               props.options.map((option, idx) => {
                  return (
                     <div key={idx} className='mb-margin-m flex items-center'>
                        <input
                           className='mr-margin-xs w-6 h-6'
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