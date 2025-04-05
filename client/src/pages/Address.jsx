import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import AddAddress from '../components/AddAddress'
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import EditAddressDetail from '../components/EditAddressDetail';
import AxiosToastError from '../utils/AxiosToastError';
import SummaryAPI from '../common/SummaryApi';
import toast from 'react-hot-toast';
import { useGlobalContext } from '../provider/provider';
import Axios from '../utils/Axios';

const Address = () => {

  const addressList = useSelector(state => state.addresses.addressList)
  const [openAddress, setOpenAddress] = useState(false)
  const [openEditAddress , setOpenEditAddress] = useState(false)
  const [editData , setEditData] = useState({})
  const { fetchAddress } = useGlobalContext()

  const handleDisableAddress = async (id) => {
    try {
      
      const response = await Axios({
        ...SummaryAPI.disableAddress,
        data : {
          _id : id
        }
      })

      const { data : responseData } = response

      if(responseData.success){
        toast.success(responseData.message)
        if(fetchAddress){
          fetchAddress()
        }
      }

    } catch (error) {
      AxiosToastError(error)
    }
  }


  return (
    <section className='grid gap-2'>
      <div className='bg-white shadow-md px-2 py-2 rounded flex items-center justify-between gap-4'>
        <p className='font-semibold text-ellipsis line-clamp-1'>Address</p>
        <button className='border border-primary-200 text-primary-200 px-3 py-1 rounded-full hover:bg-primary-200 hover:text-black cursor-pointer' onClick={() => setOpenAddress(true)}>Add Address</button>
      </div>
      <div className='bg-white p-2 grid gap-4'>
        {
          addressList.map((address, index) => {
            console.log(address._id)
            return (
              <div className={`border border-gray-200 rounded p-3 flex gap-3 justify-between hover:bg-blue-50 ${!address.status && 'hidden'}`} key={index+"addressList"}>
                <div>
                  <p>{address.address_line}</p>
                  <p>{address.city}</p>
                  <p>{address.state}</p>
                  <p>{address.country} - {address.pincode}</p>
                  <p>{address.mobile}</p>
                </div>
                <div className='grid gap-10'>
                  <button onClick={() => {
                    setOpenEditAddress(true)
                    setEditData(address)
                  }} className='cursor-pointer p-1 bg-green-200 rounded hover:text-white hover:bg-green-600'><MdEdit size={20}/></button>
                  <button onClick={() => handleDisableAddress(address._id)} className='bg-red-200 p-1 rounded hover:text-white hover:bg-red-600 cursor-pointer'><MdDelete size={20}/></button>
                </div>
              </div>
            )
          })
        }
        <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-gray-200 border-dashed flex items-center justify-center cursor-pointer'>
          Add Address
        </div>

      </div>

      {
        openAddress && (
          <AddAddress close={() => setOpenAddress(false)} />
        )
      }

      {
        openEditAddress && (
          <EditAddressDetail data={editData} close={() => setOpenEditAddress(false)}/>
        )
      }

    </section>
  )
}

export default Address
