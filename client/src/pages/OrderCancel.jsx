import React from 'react'
import { Link } from 'react-router-dom'

const OrderCancel = () => {
  return (
    <div className='bg-red-200 w-full max-w-md p-4 py-6  flex flex-col items-center m-3 mx-auto'>
      <p className='font-bold text-red-900 text-lg text-center'>Order Cancel</p>
      <Link to='/' className='border border-red-900 px-4 py-1 text-red-900 hover:bg-red-600 hover:text-white transition-all cursor-pointer rounded'>Go To Home</Link>
    </div>
  )
}

export default OrderCancel
