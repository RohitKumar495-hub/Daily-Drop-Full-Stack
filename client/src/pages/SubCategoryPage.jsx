import React, { useEffect, useState } from 'react'
import UploadSubCategoryModel from '../components/UploadSubCategoryModel'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryAPI from '../common/SummaryApi'
import Axios from '../utils/Axios'
import DisplayTable from '../components/DisplayTable'
import { createColumnHelper } from '@tanstack/react-table'
import ViewImage from '../components/ViewImage'
import { MdDelete } from "react-icons/md";
import { HiMiniPencil } from "react-icons/hi2";
import EditSubCategory from '../components/EditSubCategory'
import ConfirmBox from '../components/ConfirmBox'
import toast from 'react-hot-toast'

const SubCategoryPage = () => {

  const [openAddSubCategory , setOpenAddSubCategory] = useState(false)
  const [ data , setData ] = useState([])
  const [loading , setLoading] = useState(false)
  const columnHelper = createColumnHelper()
  const [imageURL , setImageURL] = useState("")
  const [openEdit , setOpenEdit] = useState(false)
  const [editData , setEditData] = useState({
    _id : ""
  })

  const [deleteSubCategory , setDeleteSubCategory] = useState({
    _id : ""
  })

  const [openDeleteConfirmBox , setOpenDeleteConfirmBox] = useState(false)

  const fetchSubCategory = async () => {
    try {
      const response = await Axios({
        ...SummaryAPI.getSubCategory
      })

      const { data : responseData } = response

      if(responseData.success){
        setData(responseData.data)
      }


    }catch (error) {
      AxiosToastError(error)
    } finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSubCategory()
  }, [])

  const column = [
    columnHelper.accessor('name' , {
      header : "Name"
    }),
    columnHelper.accessor('image' , {
      header : "Image",
      cell : ({row}) => {
        console.log("row" , row.original.image)
        return <div className='flex justify-center items-center'>
        <img 
          src={row.original.image}
          alt='row.original.name'
          className='w-8 h-8 cursor-pointer'
          onClick={() => {
            setImageURL(row.original.image)
          }}
        />
        </div>
      }
    }),
    columnHelper.accessor('category' , {
      header : 'Category',
      cell : ({row}) => {
        return (
          <>
            {
              row.original.category.map((c, index) => {
                return (
                  <p key={c._id+"table"} className='shadow-md px-1 inline'>{c.name}</p>
                )
              })
            }
          
          </>
        )
      }
    }),
    columnHelper.accessor("_id" , {
      header : "Action",
      cell : ({row}) => {
        return (
          <div className='flex items-center justify-center gap-3'>
            <button onClick={() => {
              setOpenEdit(true)
              setEditData(row.original)
            }} className='p-2 bg-green-100 rounded-full hover:text-green-600 cursor-pointer'>
              <HiMiniPencil size={20}/>
            </button>
            <button onClick={() => {
              setOpenDeleteConfirmBox(true)
              setDeleteSubCategory(row.original)
            }} className='p-2 bg-red-100 text-red-400 rounded-full hover:text-red-600 cursor-pointer'>
              <MdDelete size={20}/>
            </button>
          </div>
        )
      }
    })
  ]

  const handleDeleteSubCatgory = async () => {
      try {

        const response = await Axios({
          ...SummaryAPI.deleteSubCategory,
          data : deleteSubCategory
        })

        const { data : responseData } = response

        if(responseData.success){
          toast.success(responseData.message)
          fetchSubCategory()
          setOpenDeleteConfirmBox(false)
          setDeleteSubCategory({_id : ""})
        }
        
      } catch (error) {
        AxiosToastError(error)
      }
  }

  return (
    <section>
    <div className='p-2 bg-white shadow-md py-2 w-full flex items-center justify-between rounded'>
        <h2 className='font-semibold'>Sub Category</h2>
        <button 
          onClick={() => setOpenAddSubCategory(true)}
          className='text-sm border border-primary-200 hover:bg-primary-200 px-3 py-1 rounded cursor-pointer'>Add Sub Category</button>
    </div>

    <div className='overflow-auto w-full max-w-[95vw]'>
      <DisplayTable 
        data={data}
        column={column}/>
    </div>

    {
      openAddSubCategory && 
        <UploadSubCategoryModel 
          close={() => setOpenAddSubCategory(false)}
          fetchData = {fetchSubCategory}
        />
    }

    {
      imageURL && 
      <ViewImage url={imageURL} close={() => setImageURL("")}/>
    }

    {
      openEdit &&
      <EditSubCategory 
        data={editData} 
        close={() => setOpenEdit(false)}
        fetchData={fetchSubCategory}
      />
    }

    {
      openDeleteConfirmBox && (
        <ConfirmBox
          cancel={() => setOpenDeleteConfirmBox(false)}
          close={() => setOpenDeleteConfirmBox(false)}
          confirm={handleDeleteSubCatgory}
        
        />
      )
    }

    </section>
  )
}

export default SubCategoryPage
