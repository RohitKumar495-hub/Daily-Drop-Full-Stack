import { React,  useState } from 'react'
import { IoIosClose } from 'react-icons/io'
import uploadImage from '../../../server/utils/uploadImage'
import SummaryAPI from '../common/SummaryApi'
import toast from 'react-hot-toast'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'


const EditCategory = ({close , fetchData , data:CategoryData}) => {

    const [data , setData] = useState({
        _id : CategoryData._id,
        name : CategoryData.name,
        image : CategoryData.image
      })
    
      const [loading , setLoading] = useState(false)
    
      const handleOnChange = (e) => {
        const {name , value} = e.target 
    
        setData((prev) => {
            return {
              ...prev , 
              [name] : value         
          }
        })
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
    
        try {
          setLoading(true)
          const response = await Axios({
            ...SummaryAPI.updateCategory,
            data : data
          })
    
          const {data : responseData } = response
    
          if(responseData.success){
            toast.success(responseData.message)
            close()
            fetchData()
          }
    
        } catch (error) {
    
            AxiosToastError(error)
    
        }finally {
          setLoading(false)
        }
    
      }

    const hanldeUploadCategoryImage = async (e) => {
        const file = e.target.files[0]
    
        if(!file){
          return 
        }

        setLoading(true)
    
        const response = await uploadImage(file)
        const { data : ImageResponse } = response
        setLoading(false)
    
        setData((prev) => {
          return {
            ...prev,
            image : ImageResponse.data.url
          }
        })
        
      }

  return (
    <section className='fixed top-0 bottom-0 left-0 right-0 p-4 bg-neutral-800/60 flex items-center justify-center text-black'>
        <div className='bg-white max-w-4xl w-full p-4 rounded'>
          <div className='flex items-center justify-between'>
            <h1 className='font-semibold'>Update Category</h1>
            <button onClick={close} className='cursor-pointer block ml-auto'>
                <IoIosClose size={30}/>
            </button>
          </div>
          <form action="" className='my-3 grid-gap-4' onSubmit={handleSubmit}>

            <div className='grid gap-1'>
              <label htmlFor="categoryName">Name</label>
              <input 
                type="text" 
                id="categoryName"
                placeholder='Enter Category name'
                value = {data.name}
                name = 'name'
                onChange={handleOnChange}
                className='bg-blue-50 p-2 border border-blue-100 focus-within:border-primary-200 rounded outline-none'
              />
            </div>

            <div className='grid gap-1'>
              <p>Image</p>
              <div className='flex gap-4 flex-col lg:flex-row items-center'>
                <div className='border border-gray-200 bg-blue-50 h-36 lg:w-36 flex items-center justify-center rounded'>
                  {
                      data.image ? (
                        <img src={data.image} alt="category"
                          className='w-full h-full object-scale-down' />
                      ) : (<p className='text-sm text-neutral-500'>No Iamge</p>)
                  }
                </div>
                <label htmlFor="uploadCategoryImage">
                  <div className={`
                      ${!data.name ?"bg-gray-400" : "border-primary-200 hover:bg-primary-200"}
                      px-4 py-2 rounded cursor-pointer border border-gray-200 
                    `}>
                        {
                            loading ? "Loading..." : "Upload Image"
                        }
                        </div>
                    <input 
                      type="file" 
                      id='uploadCategoryImage'
                      className='hidden'
                      disabled = {!data.name}
                      onChange={  hanldeUploadCategoryImage }
                    />
                </label>

              </div>
            </div>

            <button className={`
              ${data.name && data.image ? "bg-primary-200 hover:bg-primary-100" : "bg-gray-300"}
              mt-4 w-full py-2 cursor-pointer font-semibold `}> Update Category</button>

          </form>
        </div>
    </section>
  )
}

export default EditCategory
