import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryAPI from '../common/SummaryApi'
import CardLoading from './CardLoading'
import CardProduct from './CardProduct'
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import { validURLConvert } from '../utils/validURLConvert'

const CategoryWiseProductDisplay = ({ id , name }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const subCategoryData = useSelector(state => state.product.allsubCategory)
    const loadingCardNumber = new Array(6).fill(null)

    console.log("subCategoryData" , subCategoryData)

    const containerRef = useRef()

    console.log("name" , name)
    console.log("id" , id)
    console.log("subcategoryName" , subCategoryData.name)
    console.log("subCategoryID" , subCategoryData._id)

    const fetchCategoryWiseProduct = async () => {
        try {

            setLoading(true)
            const response = await Axios({
                ...SummaryAPI.getProductByCategory,
                data: {
                    id: id
                }
            })

            const { data: responseData } = response

            if (responseData.success) {
                setData(responseData.data)
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategoryWiseProduct()
    }, [])

    const handleScrollRight = () => {
        containerRef.current.scrollLeft += 200
    }

    const handleScrollLeft = () => {
        containerRef.current.scrollLeft -= 200
    }
    
      const handleRedirectProductListPage = () => {
        const subcategory = subCategoryData.find(sub => {
          const filterData = sub.category.some(c => {
            return c._id === id
          })
    
          return filterData ? true : null
        })
    
        const url = `/${validURLConvert(name)}-${id}/${validURLConvert(subcategory?.name)}-${subcategory?._id}`
        return url
      }

      const redirectURL = handleRedirectProductListPage()

    return (
        <div>
            <div className='mx-auto p-4 flex items-center justify-between gap-4'>
                <h3 className='font-semibold text-lg md:text-xl'>{name}</h3>
                <Link to={redirectURL} className='text-green-600 hover:text-green-400'>See All</Link>
            </div>

            <div className='relative flex items-center'>

                <div className='flex gap-4 md:gap-6 lg:gap-8 mx-auto px-4 overflow-x-scroll scroll-smooth scrollbar-none' ref={containerRef}>

                    {
                        loading &&
                        loadingCardNumber.map((_, index) => {
                            return (
                                <CardLoading key={"CategoryWiseProductDisplay123" + index} />
                            )
                        })
                    }

                    {
                        data.map((p, index) => {
                            return (
                                <CardProduct data={p} key={p._id + "CategoryWiseProductDisplay" + index} />
                            )
                        })
                    }

                </div>


                <div className='absolute w-full hidden lg:flex justify-between left-0 right-0 mx-auto px-2'>
                    <button onClick={handleScrollLeft} className='z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100 cursor-pointer'>
                        <FaAngleLeft />
                    </button>
                    <button onClick={handleScrollRight} className='z-10 relative bg-white shadow-lg p-2 rounded-full text-lg hover:bg-gray-100 cursor-pointer'>
                        <FaAngleRight />
                    </button>
                </div>

            </div>
        </div>
    )
}

export default CategoryWiseProductDisplay
