import React, { useState } from 'react'
import DisplayPriceInRs from '../utils/DisplayPriceInRs'
import { Link, useLocation } from 'react-router-dom';
import { validURLConvert } from '../utils/validURLConvert';
import { PriceWithDiscount } from '../utils/PriceWithDiscount';
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryAPI from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/provider';
import AddToCartButton from './AddToCartButton';


const CardProduct = ({data}) => {

    const imageArray = Array.isArray(data.image) && Array.isArray(data.image[0]) ? data.image[0] : data.image;
    const url = `/product/${validURLConvert(data.name)}-${data._id}` 
    console.log("url" , url) 
    const [loading , setLoading] = useState(false)
    
  return (
    <Link to={url} className='lg:p-4 border bg-white border-gray-200 grid gap-1 lg:gap-3 min-w-36 lg:max-w-52 rounded lg:min-w-52'>
        <div className='min-h-20 w-full max-h-24 lg:max-h-32 rounded overflow-hidden'>
        {imageArray?.length > 0 && (
                    <img 
                        src={imageArray[0]} 
                        alt={data?.name} 
                        className='w-full h-full object-scale-down lg:scale-125'
                    />
                )}
        </div>
        <div className='flex items-center gap-2'>
        <div className='p-[1px] rounded text-xs lg:text-sm w-fit text-green-600 bg-green-50 px-2'>
            10 min
        </div>
        <div>
                {
                    Boolean(data.discount) && (
                        <p className='text-green-600 bg-green-100 px-2 w-fit text-xs rounded-full'>{data.discount}% discount</p>
                    )
                }
        </div>
        </div>
        <div className='px-2 lg:px-0 font-medium text-ellipsis text-sm lg:text-base line-clamp-2'>
            {data.name}
        </div>
        <div className='w-fit px-2 lg:px-0 text-sm lg:text-base'>
            {data.unit} 
        </div>
        <div className='flex items-center justify-between lg:gap-3 gap-1 text-sm lg:text-base px-2 lg:px-0'>
                <div className='flex items-center gap-1'>
                    <div className='font-semibold text-xs lg:text-base'>
                        {DisplayPriceInRs(PriceWithDiscount(data.price , data.discount))}
                    </div>
                </div>
            <div className='font-semibold text-xs mb-1 lg:mb-0 lg:text-base'>
                {
                    data.stock == 0 ? (
                        <p className='text-red-500 text-sm text-center'>Out of stock</p>
                    ) : (
                        <AddToCartButton data={data}/>
                    )
                }
            </div>
        </div>
    </Link>
  )
}

export default CardProduct
