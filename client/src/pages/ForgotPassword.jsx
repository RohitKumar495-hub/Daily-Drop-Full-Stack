import React, { useState } from 'react'
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useNavigate } from 'react-router-dom';

const ForgotPassword  = () => {

    const navigate = useNavigate()

    const [data , setData] = useState({
        email : ''
    })

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
                ...SummaryAPI.ForgotPassword , 
                data : data 

            })

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                
                navigate('/verification-otp', {
                  state: data
                })
                
                setData({
                    email : ''
                })
            }
            console.log("response" , response)
        }catch (error) {
            AxiosToastError(error)
        }

    }


  return (
    <section className='w-full container mx-auto px-2'>
       <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-4'>      
        <p className='font-semibold text-lg'>Forgot Password</p>
            <form action="" className='grid gap-4 mt-6' onSubmit={handleSubmit}>

                <div className='grid gap-1'>
                    <label htmlFor="email">Email :</label>
                    <input 
                        type="email" 
                        id="email"
                        autoFocus 
                        name='email'  
                        className='bg-blue-50 p-2 border border-gray-300 rounded outline-none focus:border-primary-200'
                        value={data.email} 
                        onChange={handleChange}
                        placeholder='Enter your Email'
                    />
                </div>
                

                <button disabled={!validateData} className={`${validateData ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold cursor-pointer my-3 tracking-wide`}>Send Otp</button>

            </form>


            <p>
                Already have account ? <Link to='/login' className='font-semibold text-green-700 hover:text-green-900'>Login</Link>
            </p>
       </div>
    </section>
  )
}

export default ForgotPassword
