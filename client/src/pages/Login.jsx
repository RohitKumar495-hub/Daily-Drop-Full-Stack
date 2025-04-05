import React, { useState } from 'react'
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';
import fetchUserDetails from '../utils/fetchUserDetails'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [data , setData] = useState({
        email : '',
        password : '',
    })

    const [showPassword , setShowPassword] = useState(false)

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

        try{
            const response = await Axios({
                ...SummaryAPI.login , 
                data : data 

            })

            if(response.data.error){
                AxiosToastError(error)
            }

            if(response.data.success){
                toast.success(response.data.message)
                localStorage.setItem('accessToken' , response.data.data.accessToken)
                localStorage.setItem('refreshToken' , response.data.data.refreshToken)
                
                const userDetails = await fetchUserDetails()
                dispatch(setUserDetails(userDetails.data))
                
                setData({
                    email : '',
                    password : ''
                })
        
                navigate('/')
            }

        } catch (error) {
            AxiosToastError(error)
        }

    }


  return (
    <section className='w-full container mx-auto px-2'>
       <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-6'>      
        <p>Login to explore the app</p>
            <form action="" className='grid gap-4 py-6' onSubmit={handleSubmit}>

                <div className='grid gap-1'>
                    <label htmlFor="email">Email :</label>
                    <input 
                        type="email" 
                        id="email"
                        name='email'  
                        className='bg-blue-50 p-2 border border-gray-300 rounded outline-none focus:border-primary-200'
                        value={data.email} 
                        onChange={handleChange}
                        placeholder='Enter your email'
                    />
                </div>

                <div className='grid gap-1'>
                    <label htmlFor="password">Password :</label>
                        <div className='bg-blue-50 p-2 border border-gray-300 rounded flex items-center focus-within:border-primary-200'>
                            <input 
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name='password'  
                                className='w-full outline-none'
                                value={data.password} 
                                onChange={handleChange}
                                placeholder='Enter your password'
                            />
                            <div onClick={() => setShowPassword(prev => !prev)} className='cursor-pointer'>
                                {
                                    !showPassword ? (<IoEyeOffSharp/>):
                                    (<IoEye/>)
                                }
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className='block ml-auto hover:text-primary-200'>Forgot Password</Link>
                </div>

                <button disabled={!validateData} className={`${validateData ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold cursor-pointer my-3 tracking-wide`}>Login</button>

            </form>


            <p>
                Don't have account ? <Link to='/register' className='font-semibold text-green-700 hover:text-green-900'>Register</Link>
            </p>
       </div>
    </section>
  )
}

export default Login
