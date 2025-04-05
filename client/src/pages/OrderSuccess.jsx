import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const OrderSuccess = () => {

    const location = useLocation()

    console.log(location?.state?.text)

  return (
    <div className='m-2 p-4 w-full max-w-md bg-green-200 rounded mx-auto py-5 flex flex-col items-center justify-center gap-5'>
        <p className='text-green-800 font-bold text-lg'>{Boolean(location?.state?.text) ? location?.state?.text : "Payment"} Successfully</p>
        <Link to='/' className='border border-green-900 px-4 py-1 text-green-900 hover:bg-green-600 hover:text-white transition-all cursor-pointer rounded'>Go To Home</Link>
    </div>
  )
}

export default OrderSuccess


