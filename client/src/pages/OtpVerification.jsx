import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryAPI from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const OtpVerification = () => {

    const navigate = useNavigate()
    const inputRef = useRef([])
    const location = useLocation()

    console.log("location" , location)

    useEffect(() => {
        if(!location?.state?.email){
            navigate('/forgot-password')
        }
    }, [])


    const [data , setData] = useState(['' , '' , '' , '' , '' , ''])

    const validateData = data.every(el => el)

    const handleSubmit = async (e) => {
        e.preventDefault();

        try{
            const response = await Axios({
                ...SummaryAPI.forgot_password_otp_verification, 
                data : {
                    otp : data.join(''),
                    email : location.state?.email
                }
                
            })
            console.log(data)

            if(response.data.error){
                toast.error(response.data.message)
            }

            if(response.data.success){
                toast.success(response.data.message)
                setData(["" , "" , "" , "" , "" , ""])
        
                navigate('/reset-password' , {
                    state : {
                       data : response.data,
                       email : location?.state?.email
                    }
                })
            }
            console.log("response" , response)
        }catch (error) {
            AxiosToastError(error)
        }

    }


  return (
    <section className='w-full container mx-auto px-2'>
       <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-6'>      
        <p className='font-semibold text-lg'>Enter OTP</p>
            <form action="" className='grid gap-4 mt-6' onSubmit={handleSubmit}>
                <div className='grid gap-1'>
                    <label htmlFor="otp">Enter Your OTP :</label>
                    <div className='flex items-center gap-2 justify-between mt-3'>
                        {
                            data.map((element , index) => {
                                return (
                                    <input 
                                        key={"otp"+index}
                                        type="text" 
                                        id="otp" 
                                        ref={(ref) => {
                                            inputRef.current[index] = ref
                                            return ref
                                        }} 
                                        value={data[index]}
                                        onChange={(e) => {
                                            const value = e.target.value
                                            console.log(value)
                                            const newData = [...data]
                                            newData[index] = value
                                            setData(newData)

                                            if(value && index < 5){
                                                inputRef.current[index+1].focus()
                                            }
                                        }}
                                        maxLength={1}
                                        className='text-center font-semibold w-full max-w-16 bg-blue-50 p-2 border border-gray-300 rounded outline-none focus:border-primary-200'
                                    />
                                )
                            })
                        }
                    </div>

                </div>

                <button disabled={!validateData} className={`${validateData ? "bg-green-800 hover:bg-green-700" : "bg-gray-500"} text-white py-2 rounded font-semibold cursor-pointer my-3 tracking-wide`}>Verify OTP</button>

            </form>


            <p>
                Already have account ? <Link to='/login' className='font-semibold text-green-700 hover:text-green-900'>Login</Link>
            </p>
       </div>
    </section>
  )
}

export default OtpVerification
