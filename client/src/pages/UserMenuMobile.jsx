import React from 'react'
import UserMenu from '../components/UserMenu'
import { IoIosClose } from "react-icons/io";

const UserMenuMobile = () => {
  return (
    <section className='bg-white'>
      <button onClick={() => window.history.back()} className='text-neutral-800 block w-fit ml-auto px-2'>
          <IoIosClose size={30}/>
      </button>
      <div className='container mx-auto p-3 w-full px-3 pb-8'> 
        <UserMenu/>
      </div>
    </section>
  )
}

export default UserMenuMobile
