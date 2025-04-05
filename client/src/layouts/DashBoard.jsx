import React from 'react'
import UserMenu from '../components/UserMenu'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DashBoard = () => {

  const user = useSelector(state => state.user)

  console.log("user dashoboard",user)

  return (
    <section className='bg-white'>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-3 border-r border-gray-300 py-4 ml-9 sticky top-20 h-[calc(100vh-200px)] overflow-y-auto">
              <UserMenu />
            </div>
            
            {/* Content */}
            <div className="lg:col-span-9 bg-white p-4 min-h-[75vh]">
              <Outlet />
            </div>
          </div>
    </section>
  )
}

export default DashBoard
