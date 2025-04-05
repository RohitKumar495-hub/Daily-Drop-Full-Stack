import React, { useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import uploadImage from '../../../server/utils/uploadImage'
import { useSelector } from 'react-redux'
import SummaryAPI from '../common/SummaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'

const EditSubCategory = ({close , data , fetchData}) => {

    const [subCategoryData , setSubCategoryData] = useState({
        _id : data._id,
        name : data.name,
        image : data.image,
        category : data.category || []
    }) 

    const allCategory = useSelector(state => state.product.allCategory)

    const handleChange = (e) => {
        const { name , value } = e.target

        setSubCategoryData((prev) => {
            return ({
                ...prev,
                [ name ] : value
            })
        })
    }

    console.log(data.image)

    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0]

        if(!file){
            return
        }

        const response = await uploadImage(file)
        const { data : ImageResponse } = response

        setSubCategoryData((prev) => {
            return{
                ...prev,
                image : ImageResponse.data.url
            }
        })
    }

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(el => el._id === categoryId)
        subCategoryData.category.splice(index , 1)
        setSubCategoryData((prev) => {
            return {
                ...prev
            }
        })
    }

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault()
        if (!subCategoryData.name || !subCategoryData.image || subCategoryData.category.length === 0) {
            toast.error("Please fill all required fields.");
            return;
        }
        
        try{
            
            const response = await Axios({
                ...SummaryAPI.updateSubCategory,
                data : subCategoryData
            })

            const { data : responseData } = response

            console.log(responseData)

            if(responseData.success){
                toast.success(responseData.message)
                if(close){
                    close()
                }

                if(fetchData){
                    fetchData()
                }
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }

    console.log("subCategoryData" , subCategoryData)

return (
    <section className='fixed top-0 right-0 bottom-0 left-0 bg-neutral-800/70 z-50 flex items-center justify-center p-4'>
        <div className='w-full max-w-5xl bg-white p-4 rounded'>

            <div className='flex justify-between items-center gap-3'>
                <h1 className='font-semibold'>Edit Sub Category</h1>
                <button onClick={close} className='cursor-pointer'>
                    <IoIosClose size={30}/>
                </button>
            </div>

            <div>

                <form className='my-3 grid gap-3' onSubmit={handleSubmitSubCategory}>
                        <div className='grid gap-1'>
                            <label htmlFor="name">Name</label>
                            <input 
                                type="text"
                                id='name'
                                name='name'
                                value={subCategoryData.name}
                                onChange={handleChange}
                                className='p-3 bg-blue-50 border outline-none focus-within:border-primary-200 rounded ' 
                            />
                        </div>
                        
                        <div className='grid gap-1'>
                            <p>Image</p>
                            <div className='flex flex-col gap-3 lg:flex-row lg:items-center'>
                                <div className='border h-36 lg:w-36 bg-blue-50 border-gray-200 flex items-center justify-center'>
                                    {
                                        !subCategoryData.image ? (
                                            <p className='text-sm text-neutral-400'>No Image</p>
                                        ) : (
                                            <img src={subCategoryData.image} alt="sub-category"
                                            className='w-full h-full object-scale-down' />
                                        )
                                    }
                                </div>
                                <label htmlFor="uploadSubCategoryImage">
                                    <div className='cursor-pointer px-4 py-1 border border-primary-100 text-primary-200 rounded hover:bg-primary-200 hover:text-neutral-900'>
                                            Upload Image
                                    </div>
                                    <input type="file" 
                                        id="uploadSubCategoryImage"
                                        className='hidden'
                                        onChange={handleUploadSubCategoryImage}
                                    />
                                </label>

                            </div>
                        </div>

                        <div className='grid gap-1'>
                            <label htmlFor="">Select Category</label>
                            <div className='border focus-within:border-primary-200 rounded'>

                                {/* display value */}
                                <div className='flex flex-wrap gap-2 '>

                                    {
                                        subCategoryData.category.map((category , index) => {
                                            return (
                                                <span key={category._id+"selectedValue"} className='bg-white shadow-md px-1 m-1 flex items-center gap-2'>
                                                    {category.name}
                                                    <div className='cursor-pointer hover:text-red-600' onClick={() => handleRemoveCategorySelected(category._id)}>
                                                        <IoIosClose size={25}/>
                                                    </div>
                                                </span>
                                            )
                                        })
                                    }
                                </div>

                                {/* select category */}
                                <select name="" id="" className='w-full p-2 bg-transparent outline-none border border-gray-200' onChange={(e) => {
                                    const value = e.target.value
                                    const categoryDetails = allCategory.find(el => el._id == value)
                                    setSubCategoryData((prev) => {
                                        return {
                                            ...prev,
                                            category : [...prev.category , categoryDetails]
                                        }
                                    })
                                } }>
                                    <option value={""}>Select Category</option>
                                    {
                                        allCategory.map((category , index) => {
                                            return (
                                                <option value={category?._id} key={category._id+"subcategory"}>{category?.name}</option>
                                            )
                                        })
                                    }
                                </select>

                            </div>

                        </div>

                        <button className={`px-4 py-2 border font-semibold cursor-pointer
                            ${subCategoryData?.name && subCategoryData?.image && subCategoryData?.category[0] ?
                                "bg-primary-200 hover:bg-primary-100" : "bg-gray-200"
                            }
                        `}
                        >
                            Submit
                        </button>

                </form>

            </div>

        </div>
    </section>
)
}

export default EditSubCategory

