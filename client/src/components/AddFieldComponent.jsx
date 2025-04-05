import React from 'react'
import { IoClose } from "react-icons/io5";

const AddFieldComponent = ({close , value , onChange , submit}) => {
  return (
    <section className='fixed top-0 left-0 right-0 bottom-0 bg-neutral-900/70 z-50 flex justify-center items-center p-4'>
        <div className='bg-white rounded p-4 w-full max-w-md'>
            <div className='flex justify-between gap-3 items-center'>
                <h1 className='font-semibold'>Add Field</h1>
                <button onClick={close} className='cursor-pointer'>
                    <IoClose size={20}/>
                </button>
            </div>
            <input 
                placeholder='Enter Field Name'
                value={value}
                onChange={onChange}
                className='my-3 bg-blue-50 p-2 border outline-none focus-within:border-primary-100 rounded w-full' 
            />
            <button 
                onClick={submit}
                className='bg-primary-200 px-4 py-2 rounded mx-auto w-fit block cursor-pointer hover:bg-primary-100'>Add Field</button>
        </div>
    </section>
  )
}

export default AddFieldComponent
