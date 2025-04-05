import React, { useState } from 'react'
import EditProductAdmin from './EditProductAdmin';
import { IoClose } from 'react-icons/io5';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import SummaryAPI from '../common/SummaryApi';
import toast from 'react-hot-toast';

const ProductCardAdmin = ({data , fetchProductData}) => {
   
    const imageArray = Array.isArray(data.image) && Array.isArray(data.image[0]) ? data.image[0] : data.image;
    const [editOpen , setEditOpen] = useState(false)
    const [openDelete , setOpenDelete] = useState(false)

    const handleDeleteCancel = () => {
      setOpenDelete(false)
    }

    const handleDelete = async () => {

      try {

        const response = await Axios({
          ...SummaryAPI.deleteProductDetails,
          data : {
            _id : data._id
          }
        })

        const { data : responseData } = response

        if(responseData.success){
            toast.success(responseData.message)
            if(fetchProductData){
              fetchProductData()
            }
            setOpenDelete(false)
        }
        
      } catch (error) {
        AxiosToastError(error)
      }
    }

  return (

    <div className='w-36 p-4 bg-white rounded'>
         <div>
                {imageArray?.length > 0 && (
                    <img 
                        src={imageArray[0]} 
                        alt={data?.name} 
                        className='w-full h-full object-scale-down'
                    />
                )}
            </div>
        <p className='text-ellipsis line-clamp-2 font-medium'>{data?.name}</p>
        <p className='text-slate-400'>{data?.unit}</p>

        <div className='grid grid-cols-2 gap-3 my-2'>
          <button onClick={() => setEditOpen(true)} className='cursor-pointer border px-1 py-1 text-sm border-green-600 bg-green-100 text-green-800 hover:bg-green-200 rounded'>Edit</button>
          <button onClick={() => setOpenDelete(true)} className='border px-1 w-14 py-1 text-sm border-red-600 bg-red-100 text-red-600 hover:bg-red-200 rounded cursor-pointer'>Delete</button>
        </div>

        {
           editOpen && (
             <EditProductAdmin fetchProductData={fetchProductData} productData={data} close={() => setEditOpen(false)}/>
           )
        }

        {
          openDelete && (
            <section className='fixed top-0 left-0 bottom-0 right-0 bg-neutral-600/70 z-50 p-4 flex justify-center items-center'>
                <div className='bg-white p-4 w-full max-w-md rounded'>
                    <div className='flex items-center justify-between gap-4'>
                      <h3 className='font-semibold'>Permanent Delete</h3>
                      <button className='cursor-pointer' onClick={() => setOpenDelete(false)}><IoClose size={20}/></button>
                    </div>

                    <p>Are you sure wnat to delete permanent ?</p>
                    <div className='flex justify-end gap-5 py-3'>
                      <button className='cursor-pointer border px-3 py-1 rounded bg-red-100 border-red-500 text-red-500 hover:bg-red-200' onClick={handleDeleteCancel}>Cancel</button>
                      <button className='border px-3 py-1 rounded bg-green-100 border-green-500 text-green-500 hover:bg-green-200 cursor-pointer' onClick={handleDelete}>Delete</button>
                    </div>
                </div>
            </section>
          )
        }

    </div>
  )
}

export default ProductCardAdmin
