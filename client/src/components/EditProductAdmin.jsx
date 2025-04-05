import React, { useState } from 'react'
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../../../server/utils/uploadImage';
import { FaSpinner } from "react-icons/fa6";
import ViewImage from '../components/ViewImage'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { IoClose } from "react-icons/io5";
import AddFieldComponent from '../components/AddFieldComponent';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError'
import SummaryAPI from '../common/SummaryApi';
import successAlert from '../utils/SuccessAlert';


const EditProductAdmin = ({close , productData , fetchProductData}) => {

    const [data , setData] = useState({
        _id : productData._id,
        name : productData.name,
        image : productData.image,
        category : productData.category,
        subCategory : productData.subCategory,
        unit : productData.unit,
        stock : productData.stock,
        price : productData.price,
        discount : productData.discount,
        description : productData.description,
        more_details : productData.more_details || {},
      })
    
      const handleChange = (e) => {
        const { name , value } = e.target
    
        setData((prev) => {
          return {
              ...prev,
              [name] : value
          }
        })
      }
    
      const [imageLoading , setImageLoading] = useState(false)
      const [ViewImageURL , setViewImageURL] = useState('')
      const [selectCategory , setSelectCategory] = useState('')
      const [selectSubCategory , setSelectSubCategory] = useState('')
      const [openAddField , setOpenAddField] = useState(false)
      const allSubCategory = useSelector(state => state.product.allsubCategory)
      const allCategory = useSelector(state => state.product.allCategory)
      const [fieldName , setFieldName] = useState('')
    
      const handleUploadImage = async (e) => {
        const file = e.target.files[0]
    
        if(!file){
          return
        }
    
        setImageLoading(true)
    
        const response = await uploadImage(file)
        const {data : ImageResponse} = response
        const imageUrl = ImageResponse.data.url
    
        setData((prev) => {
          return {
            ...prev,
            image : [...prev.image , imageUrl]
          }
        })
    
        setImageLoading(false)
      }
    
      const handleDeleteImage = async(index) => {
        data.image.splice(index,1)
        setData((prev) => {
          return {
            ...prev
          }
        })
      }
    
      const handleRemoveCategory = async (index) => {
        data.category.splice(index,1)
        setData((prev) => {
          return {
            ...prev 
          }
        })
      }
    
      const handleRemoveSubCategory = async (index) => {
        data.subCategory.splice(index,1)
        setData((prev) => {
          return {
            ...prev 
          }
        })
      }
    
      const handleAddField = async () => {
        setData((prev) => {
          return {
            ...prev,
            more_details : {
              ...prev.more_details,
              [fieldName] : ""
            }
          }
        })
        setFieldName('')
        setOpenAddField(false)
      }
    
      const handleSubmit = async (e) => {
          e.preventDefault()
          console.log("data" , data)
    
          try {
            
            const response = await Axios({
              ...SummaryAPI.updateProductsDetails,
              data : data
            })
    
            const { data : responseData } = response
    
            if(responseData.success){
              successAlert(responseData.message)
              if(close) {
                close()
              }
              fetchProductData()
              setData({
                name:'',
                image : [],
                category : [],
                subCategory : [],
                unit : '',
                stock : "",
                price : "",
                discount : '',
                description : '',
                more_details : {},
              })
            }
          } catch (error) {
            AxiosToastError(error)
          }
    
      }
  return (
    <section className='fixed top-0 bottom-0 right-0 left-0 bg-black/70 z-50 p-4'>
        <div className='bg-white w-full p-4 max-w-2xl mx-auto rounded overflow-y-auto h-full max-h-[95vh]'>

            <section>

                <div className='p-2 bg-white shadow-md py-2 w-full flex items-center justify-between rounded'>
                    <h2 className='font-semibold'>Update Product</h2>
                    <button>
                        <IoClose onClick={close} size={20} className='cursor-pointer'/>
                    </button>
                </div>

                <div className='grid p-3'>
                <form className='grid gap-4' onSubmit={handleSubmit}>

                    <div className='grid gap-1'>
                    <label htmlFor="name">Name</label>
                    <input 
                        id='name'
                        type="text" 
                        name='name'
                        placeholder='Enter Product Name'
                        value={data.name}
                        onChange={handleChange}
                        requried 
                        className='bg-blue-50 p-2 outline-none border border-gray-200 focus-within:border-primary-200 rounded'
                    />
                    </div>

                    <div className='grid gap-1'>
                    <label htmlFor="description">Description</label>
                    <textarea 
                        id='description'
                        type="text" 
                        name='description'
                        placeholder='Enter Product Description'
                        value={data.description}
                        onChange={handleChange}
                        requried 
                        rows={3}
                        className='bg-blue-50 p-2 outline-none border border-gray-200 focus-within:border-primary-200 rounded resize-none'
                    />
                    </div>

                    <div>
                    <p>Image</p>
                        <div>
                        <label htmlFor='productImage' className='bg-blue-50 h-24 border border-gray-200 rounded flex items-center justify-center cursor-pointer'>
                            <div className='flex justify-center items-center flex-col'>
                                {
                                imageLoading ? <FaSpinner/> : (
                                    <>
                                    <FaCloudUploadAlt size={40}/>
                                    <p>Upload Image</p>
                                    </>
                                ) 
                                }
                            </div>
                            <input 
                                type="file" 
                                id='productImage'
                                className='hidden'
                                accept='image/*'
                                onChange={handleUploadImage}
                            />
                        </label>
                            {/* display uploaded images */}
                            <div className='flex flex-wrap gap-4'>
                                {
                                data.image.map((img,index) => {
                                    return (
                                    <div key={img+index} className='h-20 mt-1 w-20 min-w-20 bg-blue-50 border border-gray-200 relative group'>
                                        <img 
                                            src={img} 
                                            alt={img}
                                            className='w-full h-full object-scale-down cursor-pointer'
                                            onClick={() => setViewImageURL(img)}
                                        />
                                        <div onClick={() => handleDeleteImage(index)} className='absolute bottom-0 right-0 p-1 bg-red-600 rounded text-white hidden group-hover:block cursor-pointer'>
                                            <MdDelete/>
                                        </div>
                                    </div>
                                    )
                                })
                                }
                            </div>

                        </div>
                    </div>

                    <div className='grid gap-1'>
                    <label htmlFor="">Category</label>
                        <div>
                            <select className='bg-blue-50 border w-full border-gray-100 p-2 rounded' value={selectCategory} onChange={(e) => {
                            const value = e.target.value
                            const category = allCategory.find(el => el._id === value)
                            console.log(category)

                            setData((prev) => {
                                return {
                                ...prev,
                                category : [...prev.category , category]
                                }
                            })
                            setSelectCategory('')
                            }}>
                            <option value={""}>Select Category</option>
                            {
                                allCategory.map((c,index) => {
                                    return (
                                    <option value={c?._id}>{c.name}</option>
                                    )
                                })
                            }
                            </select>
                            
                            <div className='flex flex-wrap gap-3'>
                            {
                                data.category.map((c,index) => {
                                return (
                                <div key={c._id+index+"productsection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                                    <p>{c.name}</p>
                                    <div className='cursor-pointer hover:text-red-500' onClick={() => handleRemoveCategory(index)}>
                                        <IoClose size={20}/>
                                    </div>
                                </div>
                                )
                            })
                            }
                            </div>
                        </div>
                    </div>

                    <div className='grid gap-1'>
                    <label htmlFor="">Sub Category</label>
                        <div>
                            <select className='bg-blue-50 border w-full border-gray-100 p-2 rounded' value={selectSubCategory} onChange={(e) => {
                            const value = e.target.value
                            const subCategory = allSubCategory.find(el => el._id === value)

                            setData((prev) => {
                                return {
                                ...prev,
                                subCategory : [...prev.subCategory , subCategory]
                                }
                            })
                            setSelectSubCategory('')
                            }}>
                            <option value={""} className='text-neutral-600'>Select Sub Category</option>
                            {
                                allSubCategory.map((c,index) => {
                                    return (
                                    <option value={c?._id}>{c.name}</option>
                                    )
                                })
                            }
                            </select>
                            
                            <div className='flex flex-wrap gap-3'>
                            {
                                data.subCategory.map((c,index) => {
                                return (
                                <div key={c._id+index+"subCategorySection"} className='text-sm flex items-center gap-1 bg-blue-50 mt-2'>
                                    <p>{c.name}</p>
                                    <div className='cursor-pointer hover:text-red-500' onClick={() => handleRemoveSubCategory(index)}>
                                        <IoClose size={20}/>
                                    </div>
                                </div>
                                )
                            })
                            }
                            </div>
                        </div>
                    </div>

                    <div className='grid gap-1'>
                    <label htmlFor="unit">Unit</label>
                    <input 
                        id='unit'
                        type="text" 
                        name='unit'
                        placeholder='Enter Product Unit'
                        value={data.unit}
                        onChange={handleChange}
                        requried 
                        className='bg-blue-50 p-2 outline-none border border-gray-200 focus-within:border-primary-200 rounded'
                    />
                    </div>

                    <div className='grid gap-1'>
                    <label htmlFor="stock">Number of Stock</label>
                    <input 
                        id='stock'
                        type="number" 
                        name='stock'
                        placeholder='Enter Product Stock'
                        value={data.stock}
                        onChange={handleChange}
                        requried 
                        className='bg-blue-50 p-2 outline-none border border-gray-200 focus-within:border-primary-200 rounded'
                    />
                    </div>

                    <div className='grid gap-1'>
                    <label htmlFor="name">Price</label>
                    <input 
                        id='price'
                        type="number" 
                        name='price'
                        placeholder='Enter Product Price'
                        value={data.price}
                        onChange={handleChange}
                        requried 
                        className='bg-blue-50 p-2 outline-none border border-gray-200 focus-within:border-primary-200 rounded'
                    />
                    </div>

                    <div className='grid gap-1'>
                    <label htmlFor="name">Discount</label>
                    <input 
                        id='discount'
                        type="number" 
                        name='discount'
                        placeholder='Enter Product Discount'
                        value={data.discount}
                        onChange={handleChange}
                        requried 
                        className='bg-blue-50 p-2 outline-none border border-gray-200 focus-within:border-primary-200 rounded'
                    />
                    </div>

                            {/* /Add more fields */}
                    {
                        Object?.keys(data?.more_details)?.map((k,index) => {
                        return (
                            <div className='grid gap-1'>
                            <label htmlFor={k}>{k}</label>
                            <input 
                                id={k}
                                type="text" 
                                value={data?.more_details[k]}
                                onChange={(e) => {
                                const value = e.target.value
                                setData((prev) => {
                                    return {
                                    ...prev,
                                    more_details : {
                                        ...prev.more_details,
                                        [k] : value
                                    }
                                    }
                                })
                                }}
                                requried 
                                className='bg-blue-50 p-2 outline-none border border-gray-200 focus-within:border-primary-200 rounded'
                            />
                            </div>
                        )
                        })
                    }


                    <div onClick={() => setOpenAddField(true)} className='hover:bg-primary-200 bg-white py-1 px-3 w-32 text-center font-semibold border border-primary-200 hover:text-neutral-900 cursor-pointer rounded'>
                    Add Fields
                    </div>

                    <button className='cursor-pointer bg-primary-100 hover:bg-primary-200 py-2 rounded font-semibold'>
                    Update Product 
                    </button>


                </form>
                </div>

                {
                ViewImageURL && (
                    <ViewImage url={ViewImageURL} close={() => setViewImageURL("")}/>
                )
                }

                {
                openAddField && (
                    <AddFieldComponent 
                    close={() => setOpenAddField(false)}
                    value={fieldName} 
                    onChange={(e) => {
                        setFieldName(e.target.value)
                    }} 
                    submit={handleAddField}
                    />
                )
                }

            </section>

        </div>
    </section>
  )
}

export default EditProductAdmin


