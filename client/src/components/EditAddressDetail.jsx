import React from 'react'
import { useForm } from "react-hook-form";
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryAPI from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { IoClose } from 'react-icons/io5';
import { useGlobalContext } from '../provider/provider';

const EditAddressDetail = ({close , data}) => {

    const { register, handleSubmit , reset } = useForm({
        defaultValues : {
            _id : data._id,
            userId : data.userId,
            address_line : data.address_line,
            state : data.state,
            city : data.city,
            country : data.country,
            pincode : data.pincode,
            mobile : data.mobile
        }
    })
    const { fetchAddress } = useGlobalContext()

    const onSubmit = async (data) => {

        try {
            
            const response = await Axios({
                ...SummaryAPI.updateAddress,
                data : {
                    _id : data._id,
                    userId : data.userId,
                    address_line : data.address_line,
                    state : data.state,
                    city : data.city,
                    country : data.country,
                    pincode : data.pincode,
                    mobile : data.mobile
                }
            })

            console.log(response.data)

            const { data : responsData } = response

            if(responsData.success){
                toast.success(responsData.message)
                if(close)
                {
                    close()
                    reset()
                    fetchAddress()
                }
                
            }

        } catch (error) {
            AxiosToastError(error)            
        }
    }



  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 bg-black/70 z-50 h-screen overflow-auto'>
      <div className='bg-white p-4 w-full max-w-lg rounded mx-auto mt-8'>
        <div className='flex items-center justify-between gap-4'>
            <h2 className='font-semibold'>Update Address</h2>
            <button className='cursor-pointer hover:text-red-500' onClick={close}>
                <IoClose size={25}/>
            </button>
        </div>
        <form className='mt-4 grid gap-4' onSubmit={handleSubmit(onSubmit)}>

            <div className='grid gap-1'>
                <label htmlFor="addressline">Address Line :</label>
                <input 
                    type="text" 
                    id='addressline'
                    className='border border-gray-200 bg-blue-50 p-2 rounded'
                    {...register('address_line',{required:true})}
                />
            </div>
            
            <div className='grid gap-1'>
                <label htmlFor="state">State :</label>
                <input 
                    type="text" 
                    id='state'
                    className='border border-gray-200 bg-blue-50 p-2 rounded'
                    {...register('state',{required:true})}
                />
            </div>

            <div className='grid gap-1'>
                <label htmlFor="city">City :</label>
                <input 
                    type="text" 
                    id='city'
                    className='border border-gray-200 bg-blue-50 p-2 rounded'
                    {...register('city',{required:true})}
                />
            </div>

            <div className='grid gap-1'>
                <label htmlFor="pincode">Pincode :</label>
                <input 
                    type="text" 
                    id='pincode'
                    className='border border-gray-200 bg-blue-50 p-2 rounded'
                    {...register('pincode',{required:true})}
                />
            </div>
            
            <div className='grid gap-1'>
                <label htmlFor="country">country :</label>
                <input 
                    type="text" 
                    id='country'
                    className='border border-gray-200 bg-blue-50 p-2 rounded'
                    {...register('country',{required:true})}
                />
            </div>
            
            <div className='grid gap-1'>
                <label htmlFor="mobile">Mobile No:</label>
                <input 
                    type="text" 
                    id='mobile'
                    className='border border-gray-200 bg-blue-50 p-2 rounded'
                    {...register('mobile',{required:true})}
                />
            </div>

            <button type='submit' className='bg-primary-200 w-full py-2 font-semibold hover:bg-primary-100 rounded cursor-pointer mt-4'>Update</button>
        </form>
      </div>
    </section>
  )
}

export default EditAddressDetail
