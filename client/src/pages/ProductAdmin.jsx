import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoIosSearch } from "react-icons/io";

const ProductAdmin = () => {

  const [productData , setProductData] = useState([])
  const [page , setPage] = useState(1)
  const [loading , setLoading] = useState(false)
  const [totalPageCount , setTotalPageCount] = useState(1)
  const [search , setSearch] = useState("")


  const fetchProductData = async () => {
    try {
      
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.getProduct,
        data : {
          page : page,
          limit : 12,
          search : search
        }
        
      })

      const { data : responseData } = response

      if(responseData.success){
        setProductData(responseData.data) 
        if (responseData.totalPages) {
          setTotalPageCount(responseData.totalPages);
        }
        // If API returns total count instead of pages
        else if (responseData.totalCount) {
          setTotalPageCount(Math.ceil(responseData.totalCount / 12));
        } 
      } 

    } catch (error) {
      AxiosToastError(error)
    }finally{
      setLoading(false)
    }
  }

  const handleNext = () => {
    if(page !== totalPageCount){
      setPage(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if(page > 1){
      setPage(prev => prev - 1)
    }

  }

  useEffect(() => {
    fetchProductData()
  } , [page])

  const handleOnChange = (e) => {
    const { value } = e.target
    setSearch(value)
    setPage(1)
  }

  useEffect(() => {
    let flag = true
    const interval = setTimeout(() => {
      if(flag){
        fetchProductData()
        flag = false
      }
    },300);
    return () => {
      clearTimeout(interval)
    }
  },[search])

  return (
    <section>
        <div className='p-2 bg-white shadow-md py-2 w-full flex items-center justify-between rounded gap-4'>
            <h2 className='font-semibold'>Product</h2>
            <div className='min-w-24 bg-blue-50 h-full flex items-center px-4 gap-3 py-2 border rounded border-gray-100 focus-within:border-primary-200'>
              <IoIosSearch size={20}/>
              <input 
                type="text" 
                placeholder='Search product here'
                value={search}
                onChange={handleOnChange}
                className='h-full outline-none w-full'
              />
            </div>
        </div>

        {
          loading && (
            <Loading/>
          )
        }

        <div className='p-4 bg-blue-50'>
          <div className='min-h-[55vh]'>
            <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {
                  productData.map((p,index) => {
                    return (
                      <ProductCardAdmin data={p} fetchProductData={fetchProductData}/>
                    )
                  })
                }
            </div>
          </div>

          <div className='flex justify-between my-4'>
            <button onClick={handlePrevious} className='border border-primary-200 px-4 py-1 hover:bg-primary-200 cursor-pointer'>Previous</button>
            <button>{page}/{totalPageCount}</button>
            <button onClick={handleNext} className='border border-primary-200 px-4 py-1 hover:bg-primary-200 cursor-pointer'>Next</button>
          </div>

        </div>

    </section>
  )
}

export default ProductAdmin
