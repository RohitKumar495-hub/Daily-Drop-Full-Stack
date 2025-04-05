import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from '../components/UserProfileAvatarEdit';
import SummaryAPI from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import toast from 'react-hot-toast';
import { setUserDetails } from '../store/userSlice';
import fetchUserDetails from '../utils/fetchUserDetails';

const Profile = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [openProfileAvatarEdit , setOpenProfileAvatarEdit] = useState(false)

  const [ loading , setLoading ] = useState(false)

  const [ userData , setUserData ] = useState({
    name : user.name,
    email : user.email,
    mobile : user.mobile
  })

  useEffect(() => {
      setUserData({
        name : user.name,
        email : user.email,
        mobile : user.mobile
      })
  } , [user])

  const handleOnChange = (e) => {
    const { name , value } = e.target
    setUserData((prev) => {
      return {
        ...prev,
        [name] : value
      }
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{

      setLoading(true)
      const response = await Axios({
        ...SummaryAPI.updateUserDetails,
        data : userData
      })

      const {data : responseData} = response
      
      if(responseData.success){
        toast.success(responseData.message)
        const userData = await fetchUserDetails()
        dispatch(setUserDetails(userData.data))
      }

      console.log(response)

    }catch(error) {

      AxiosToastError(error)

    } finally {
      setLoading(false)
    }


  }


  return (
    <div>

        {/* profile upload and display image  */}

        <div className='w-20 h-20 flex items-center justify-center rounded-full overflow-hidden drop-shadow-sm'>
            {
              user.avatar ? (
                <img src={user.avatar} alt={user.name} className='w-full h-full'/>
              ) : (
                 <FaUserCircle size={70}/>
              )
            }
        </div>
        <button className='cursor-pointer text-sm min-w-20 border border-primary-100 px-3 py-1 rounded-md mt-4 hover:bg-primary-200' onClick={() => setOpenProfileAvatarEdit(true)}>Edit</button>
        {
           openProfileAvatarEdit && ( 
            <UserProfileAvatarEdit close={() => setOpenProfileAvatarEdit(false)}/>
          )
        }

        {/* name , mobile , email , change password */}

        <form action="" className='my-4 gap-3 flex flex-col' onSubmit={handleSubmit}>

            <div className='grid'>
              <label htmlFor="name">Name</label>
              <input 
                type="text" 
                id='name'
                placeholder='Enter your name' 
                className='p-2 bg-blue-50 outline-none rounded border focus-within:border-primary-200 lg:w-[800px]' 
                value = {userData.name}
                name = 'name'
                required
                onChange={handleOnChange}
              />
            </div>

            <div className='grid'>
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id='email'
                placeholder='Enter your email' 
                className='p-2 bg-blue-50 outline-none rounded border focus-within:border-primary-200 lg:w-[800px]' 
                value = {userData.email}
                name = 'email'
                required
                onChange={handleOnChange}
              />
            </div>

            <div className='grid'>
              <label htmlFor="mobile">Mobile</label>
              <input 
                type="text" 
                id='mobile'
                placeholder='Enter your mobile no.' 
                className='p-2 bg-blue-50 outline-none rounded border focus-within:border-primary-200 lg:w-[800px]' 
                value = {userData.mobile}
                name = 'mobile'
                required
                onChange={handleOnChange}
              />
            </div>

            <button className='border px-4 py-2 font-semibold cursor-pointer rounded hover:bg-primary-100 border-primary-100 text-primary-100 hover:text-neutral-800 lg:w-[800px]'>
              {
                loading ? "Loading" : "Submit"
              }
            </button>

        </form>
       
    </div>
  )
}

export default Profile
