import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../provider/provider'
import SummaryAPI from '../common/SummaryApi'
import Axios from '../utils/Axios'
import toast from 'react-hot-toast'
import AxiosToastError from '../utils/AxiosToastError'
import { useSelector } from 'react-redux'
import { FaMinus , FaPlus } from 'react-icons/fa6'

const AddToCartButton = ({data}) => {

        const { fetchCartItem , updateCartItem , deleteCartItem } = useGlobalContext()
        const cartItem = useSelector(state => state.cartItem.cart)
        const [isAvaliableCart , setIsAvaliableCart] = useState(false)
        const [qty , setQty] = useState(0)
        const [cartItemDetails , setCartItemsDetails] = useState()

        const handleAddToCart = async (e) => {
    
            e.preventDefault()
    
            try {
    
                const response = await Axios({
                    ...SummaryAPI.addToCart,
                    data : {
                        productId : data?._id
                    }
                })
    
                const { data : responseData } = response
    
                console.log(responseData.message)
    
                if(responseData.success) {
                    toast.success(responseData.message)
                    if(fetchCartItem){
                        fetchCartItem()
                    }
    
                }
                
            } catch (error) {
                AxiosToastError(error)
            }
        }

        useEffect(() => {
            const checkingItem = cartItem.some(item => item.productId._id === data._id )
            setIsAvaliableCart(checkingItem)
            
            const product = cartItem.find(item => item.productId._id === data._id)
            setQty(product?.quantity)
            setCartItemsDetails(product)

        } , [data , cartItem])

        const increaseQty = async (e) => {
            e.preventDefault()
            e.stopPropagation()

            const response = await updateCartItem(cartItemDetails?._id , qty + 1)
            
            if(response.success){
                toast.success("Item added")
            }
        }

        const decreaseQty = async (e) => {
            e.preventDefault()
            e.stopPropagation()
            if(qty == 1) {
                deleteCartItem(cartItemDetails?._id)
            } else {
                const response = await updateCartItem(cartItemDetails?._id , qty - 1)

                if(response.success){
                    toast.success("Item remove")
                }
            }

        }


    return (
        <div className='w-full max-w-[150px]'>
            {
                isAvaliableCart ? (
                    <div className='flex gap-1 w-full h-full'>
                        <button onClick={decreaseQty} className='bg-green-600 hover:bg-grren-700 text-white flex-1 w-full p-1 rounded cursor-pointer flex items-center justify-center'><FaMinus/></button>
                        <p className='flex-1 w-full font-semibold flex items-center justify-center'>{qty}</p>
                        <button onClick={increaseQty} className='bg-green-600 hover:bg-grren-700 text-white flex-1 w-full p-1 rounded cursor-pointer flex items-center justify-center'><FaPlus/></button>
                    </div>
                ) : (
                    <button onClick={handleAddToCart} className='bg-green-600 hover:bg-green-700 cursor-pointer text-white px-2 lg:px-4 py-1 rounded'>
                        Add
                    </button>
                )
            }

        </div>
    )
}

export default AddToCartButton
