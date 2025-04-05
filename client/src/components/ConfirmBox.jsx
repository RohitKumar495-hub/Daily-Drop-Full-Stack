import React from 'react'
import { IoIosClose } from 'react-icons/io'

const ConfirmBox = ({cancel , confirm , close}) => {
  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 z-50 bg-neutral-800/70 p-4 flex items-center justify-center'>
        <div className='bg-white w-full max-w-md p-4 rounded'>
            <div className='flex justify-between items-center p-3 '>
                <h1 className='font-semibold'>Permanent Delete</h1>
                <button onClick={close} >
                    <IoIosClose size={30}/>
                </button>
            </div>
            <p className='my-4'>Are you sure want to delete permanent?</p>
            <div className='w-fit ml-auto flex items-center gap-3'>
              <button onClick={cancel} className='border rounded border-red-500 text-red-500 py-1 px-4 cursor-pointer hover:bg-red-500 hover:text-white'>Cancel</button>
              <button onClick={confirm} className='border border-green-600 py-1 px-4 rounded cursor-pointer hover:bg-green-600 text-green-600 hover:text-white'>Confirm</button>
            </div>
        </div>
    </section>
  )
}

export default ConfirmBox
