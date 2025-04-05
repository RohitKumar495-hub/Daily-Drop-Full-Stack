import React, { useState } from 'react'
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate()

    const [data , setData] = useState({
        name : '',
        email : '',
        password : '',
        confirmPassword : ''
    })

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

        if(data.password !== data.confirmPassword){
            toast.error(
                "password and confirm password must be same"
            )
            return 
        }

        try{
            const response = await Axios({
                ...SummaryAPI.register , 
                data : data 

            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData({
                    name : '',
                    email : '',
                    password : '',
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
                    <label htmlFor="name">Name :</label>
                    <input 
                        type="text" 
                        id="name"
                        autoFocus 
                        name='name'  
                        className='bg-blue-50 p-2 border border-gray-300 rounded outline-none focus:border-primary-200'
                        value={data.name} 
                        onChange={handleChange}
                        placeholder='Enter your name'
                    />
                </div>

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

                <button disabled={!validateData} className={`${validateData ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold cursor-pointer my-3 tracking-wide`}>Register</button>

            </form>


            <p>
                Already have account ? <Link to='/login' className='font-semibold text-green-700 hover:text-green-900'>Login</Link>
            </p>
       </div>
    </section>
  )
}

export default Register
