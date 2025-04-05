import React, { useEffect, useState } from 'react'
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const ResetPassword = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [data , setData] = useState({
        email : '',
        newPassword : '',
        confirmPassword : ''
    })

    useEffect(() => {
        if(!(location?.state?.data?.success)){
            navigate('/')
        }

        if(location?.state?.email){
            setData((prev) => {
                return {
                    ...prev,
                    email : location.state.email
                }
            })
        }
    } , [])

    console.log("location" , location)

    console.log(data)

    const [showPassword , setShowPassword] = useState(false)
    const [showConfirmPassword , setShowConfirmPassword] = useState(false)

    const handleChange = (e) => {
        const { name , value } =  e.target

        setData((prev) => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const validateData = Object.values(data).every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(data.newPassword !== data.confirmPassword){
            toast.error(
                "New password and confirm password must be same"
            )
            return 
        }

        try{
            const response = await Axios({
                ...SummaryAPI.resetPassword , 
                data : data

            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    email : '',
                    newPassword : '',
                    confirmPassword : ''
                })
        
                navigate('/login')
            }
            console.log("response" , response)
        }catch (error) {
            AxiosToastError(error)
        }

    }


  return (
    <section className='w-full container mx-auto px-2'>
       <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-6'>      
        <p>Welcome to Blinkit</p>
            <form action="" className='grid gap-4 mt-6' onSubmit={handleSubmit}>

                <div className='grid gap-1'>
                    <label htmlFor="newPassword">New Password :</label>
                        <div className='bg-blue-50 p-2 border border-gray-300 rounded flex items-center focus-within:border-primary-200'>
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="newPassword"
                            name='newPassword'  
                            className='w-full outline-none'
                            value={data.newPassword} 
                            onChange={handleChange}
                            placeholder='Enter your New password'
                        />
                        <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                            {
                                !showPassword ? (<IoEyeOffSharp/>):
                                (<IoEye/>)
                            }
                        </div>
                        </div>
                </div>
                
                <div className='grid gap-1'>
                    <label htmlFor="confirmPassword">Confirm Password :</label>
                        <div className='bg-blue-50 p-2 border border-gray-300 rounded flex items-center focus-within:border-primary-200'>
                        <input 
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name='confirmPassword'  
                            className='w-full outline-none'
                            value={data.confirmPassword} 
                            onChange={handleChange}
                            placeholder='Enter your confirm password'
                        />
                        <div onClick={() => setShowConfirmPassword(prev => !prev)} className='cursor-pointer'>
                            {
                                !showConfirmPassword ? (<IoEyeOffSharp/>):
                                (<IoEye/>)
                            }
                        </div>
                        </div>
                </div>

                <button disabled={!validateData} className={`${validateData ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold cursor-pointer my-3 tracking-wide`}>Change Password</button>

            </form>

            <p>
                Already have account ? <Link to='/login' className='font-semibold text-green-700 hover:text-green-900'>Login</Link>
            </p>
       </div>
    </section>
  )
}

export default ResetPassword
