import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Divider from './Divider'
import Axios from '../utils/Axios'
import SummaryAPI from '../common/SummaryApi'
import { logout } from '../store/userSlice'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { TbExternalLink } from "react-icons/tb";
import isAdmin from '../utils/isAdmin'

const UserMenu = ({close}) => {
  
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    try{

      const response = await Axios({
        ...SummaryAPI.logout
      }) 

      if(response.data.success){
        if(response.data.success){
          if(close){
            close()
          }
        }
        dispatch(logout())
        localStorage.clear()
        toast.success(response.data.message)
        navigate('/login')
      }

    } catch (error) {
        AxiosToastError(error)
    }
  }

  const handleClose = () => {
    if(close){
      close()
    }
  }

  return (
    <div>
      <div className='font-semibold'>My Account</div>
      <div className='text-sm flex gap-2 items-center'>
        <span className='max-w-52 text-ellipsis line-clamp-1'>
          {user.name || user.mobile} <span className='text-red-600 text-[12px]'>{user.role === "ADMIN" ? ", (Admin)" : ""}</span>
        </span>
        <Link onClick={handleClose} to={"/dashboard/profile"} className='hover:text-primary-200'>
          <TbExternalLink size={18}/>
        </Link>
      </div>

      <Divider/> 

      <div className='text-sm flex flex-col gap-1 px-2 cursor-pointer'>

        {
            isAdmin(user.role) && (
              <>
                <Link onClick={handleClose} to={"/dashboard/category"} className='hover:bg-orange-200 p-1'>Category</Link>
                      
                <Link onClick={handleClose} to={"/dashboard/subcategory"} className='hover:bg-orange-200 p-1'>Sub Category</Link>
                              
                <Link onClick={handleClose} to={"/dashboard/upload-product"} className='hover:bg-orange-200 p-1'>Upload Product</Link>
                      
                <Link onClick={handleClose} to={"/dashboard/product"} className='hover:bg-orange-200 p-1'>Product</Link>
                              
              </>
            ) 
        }


        <Link onClick={handleClose} to={"/dashboard/myorders"} className='hover:bg-orange-200 p-1'>My Orders</Link>

        <Link onClick={handleClose} to={"/dashboard/address"} className='hover:bg-orange-200 p-1'>Save Address</Link>

        <button className='text-left cursor-pointer hover:bg-orange-200 p-1' onClick={handleLogOut}>Log Out</button>

      </div>
    </div>
  )
}

export default UserMenu
