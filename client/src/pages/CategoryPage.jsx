import React, { useEffect, useState } from 'react'
import UploadCategoryModel from '../components/UploadCategoryModel'
import Loading from '../components/Loading'
import NoData from '../components/NoData'
import SummaryAPI from '../common/SummaryApi'
import Axios from '../utils/Axios'
import EditCategory from '../components/EditCategory'
import ConfirmBox from '../components/ConfirmBox'
import AxiosToastError from '../utils/AxiosToastError'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'

const CategoryPage = () => {

    const [ openUploadCategory , setOpenUploadCategory ] = useState(false)

    const [loading , setLoading] = useState(false)
    const [categoryData , setCategoryData] = useState([])
    const [openEdit , setOpenEdit] = useState(false)
    const [editData , setEditData] = useState({
        name : '',
        image : ''
    })

    const [openConfirmBox , setOpenConfirmBox] = useState(false)
    const [deleteCategory , setDeleteCategory] = useState({
        _id : ""
    })

    // const allCategory = useSelector(state => state.product.allCategory)

    // useEffect(() => {
    //     setCategoryData(allCategory)
    // },[allCategory])

    const fetchCategory = async () => {
        try{

            setLoading(true)
            const response = await Axios({
                ...SummaryAPI.getCategory
            })

            const { data : responseData} = response
            if(responseData.success){
                setCategoryData(responseData.data)
            }

        } catch (error) {

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchCategory()
    }, [])

    const handleCategoryDelete = async () => {
        try{
            const response = await Axios({
                ...SummaryAPI.deleteCategory,
                data : deleteCategory
            })

            const { data : responseData } = response

            if(responseData.success){
                toast.success(responseData.message)
                fetchCategory()
                setOpenConfirmBox(false)
            }

        } catch(error) {
            AxiosToastError(error)
        }
    }
    
  return (
      <section>
        <div className='p-2 bg-white shadow-md py-2 w-full flex items-center justify-between rounded'>
            <h2 className='font-semibold'>Category</h2>
            <button 
                onClick={() => {
                setOpenUploadCategory(true)
            } }
                className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded cursor-pointer'>Add Category</button>
        </div>

        {
            !categoryData[0] && !loading && (
                <NoData/>
            )
        }

        <div className='p-4 grid grid-cols-2 lg:grid-cols-6 gap-2 md:grid-cols-4'>
        {
            categoryData.map((category , index) => {
                return (
                    <div className='w-32 h-56 rounded shadow-md' key={category._id}>
                        <img 
                            src={category.image} 
                            alt={category.name}
                            className='w-full object-scale-down' 
                        />
                        <div className='items-center h-9 flex gap-2'>
                            <button onClick={() => {setOpenEdit(true)
                                setEditData(category)
                            }} className='flex-1 cursor-pointer bg-green-100 text-green-600 hover:bg-green-200 font-medium py-1 rounded '>Edit</button>
                            <button onClick={() => {
                                setOpenConfirmBox(true)
                                setDeleteCategory(category)
                            }}
                            className='flex-1 cursor-pointer bg-red-100 hover:bg-red-200 text-red-400 font-medium py-1 rounded'>Delete</button>
                        </div>
                    </div>
                )
            })
        }
        </div>

        {
            loading && (
                <Loading/>
            )
        }

        
        {
            openUploadCategory && (
                <UploadCategoryModel fetchData={fetchCategory} close={() => setOpenUploadCategory(false)}/>
            )
        }

        {
            openEdit && (
                <EditCategory data={editData} close={() => setOpenEdit(false)}/>
            )
        }

        {
            openConfirmBox && (
                <ConfirmBox 
                    close={() => setOpenConfirmBox(false)} 
                    confirm={handleCategoryDelete} 
                    cancel={() => setOpenConfirmBox(false)}
                />
            )

        }


      </section>
  )
}

export default CategoryPage
