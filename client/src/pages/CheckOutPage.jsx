import React, { useState } from 'react'
import DisplayPriceInRs from '../utils/DisplayPriceInRs'
import { useGlobalContext } from '../provider/provider'
import AddAddress from '../components/AddAddress'
import { useSelector } from 'react-redux'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryAPI from '../common/SummaryApi'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'


const CheckOutPage = () => {

    const { totalPrice, notDiscountTotalPrice, totalQty , fetchOrder } = useGlobalContext()
    const [openAddress , setOpenAddress] = useState(false)
    const addressList  = useSelector(state => state.addresses.addressList)
    const [selectedAddress , setSelectedAddress] = useState(0)
    const cartItemsList = useSelector(state => state.cartItem.cart)
    const { fetchCartItem } = useGlobalContext()
    const navigate = useNavigate()


    const handleCashOnDelivery = async () => {
        try {

            const response = await Axios({
                ...SummaryAPI.cashOnDeliveryOrder,
                data : {
                    list_items : cartItemsList,
                    addressId : addressList[selectedAddress]?._id,
                    subTotalAmt : totalPrice, 
                    totalAmt : totalPrice,
                }
            })

            const { data : responseData } = response
            
            if(responseData.success){
                toast.success(responseData.message)
                if(fetchCartItem){
                    fetchCartItem()
                }
                if(fetchOrder){
                    fetchOrder()
                }
                navigate('/success' , {
                    state : {
                        text : "Order"
                    }
                })
            }
            
        } catch (error) {
            AxiosToastError(error)
        }
    }

    const handleOnlinePayment = async () => {
        try {

            toast.loading("Loading")
            const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLIC_KEY
            const stripePromise = await loadStripe(stripePublicKey)

            
            const response = await Axios({
                ...SummaryAPI.payment_url,
                data : {
                    list_items : cartItemsList,
                    addressId : addressList[selectedAddress]?._id,
                    subTotalAmt : totalPrice, 
                    totalAmt : totalPrice,
                }
            })

            const { data : responseData } = response

            stripePromise.redirectToCheckout({ sessionId : responseData.id })

            if(fetchCartItem){
                fetchCartItem()
            }

            if(fetchOrder){
                fetchOrder()
            }

        } catch (error) {
            AxiosToastError(error)
        }
    }


    return (
        <section className='bg-blue-50'>
            <div className='mx-auto p-4 rounded shadow-md flex flex-col lg:flex-row w-full gap-5 justify-between'>

                {/* left side */}

                <div className='w-full'>
                    {/* address */}
                    <h3 className='text-lg font-semibold'>Choose Your Address</h3>
                    <div className='bg-white p-2 grid gap-4'>
                        {
                            addressList.map((address , index) => {
                                return (
                                    <label htmlFor={"address"+index} className={!address.status && 'hidden'}>
                                        <div className='border border-gray-200 rounded p-3 flex gap-3 hover:bg-blue-50'>
                                            <div>
                                                <input 
                                                    type="radio" 
                                                    name='address'
                                                    id={'address'+index}
                                                    value={index}
                                                    onChange={(e) => setSelectedAddress(e.target.value)}
                                                    className='cursor-pointer'
                                                />
                                            </div>
                                            <div>
                                                <p>{address.address_line}</p>
                                                <p>{address.city}</p>
                                                <p>{address.state}</p>
                                                <p>{address.country} - {address.pincode}</p>
                                                <p>{address.mobile}</p>
                                            </div>
                                        </div>
                                    </label>
                                )
                            })
                        }
                         <div onClick={() => setOpenAddress(true)} className='h-16 bg-blue-50 border-2 border-gray-200 border-dashed flex items-center justify-center cursor-pointer'>
                            Add Address
                        </div>

                    </div>

                </div>

                {/* right side */}

                <div className='w-full max-w-md py-4 px-2 bg-white rounded'>
                    {/* Summary */}
                    <h3 className='text-lg font-semibold'>Summary</h3>

                    <div className='p-4'>
                        <h3 className='font-semibold'>Bill details</h3>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Total Items</p>
                            <p className='flex items-center gap-2'>
                                <span className='line-through text-neutral-400'>{DisplayPriceInRs(totalPrice)}</span>
                                <span>{DisplayPriceInRs(notDiscountTotalPrice)}</span>
                            </p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Total Quantity</p>
                            <p className='flex items-center gap-2'>
                                <span>{totalQty} Items</span>
                            </p>
                        </div>
                        <div className='flex gap-4 justify-between ml-1'>
                            <p>Delivery Charge</p>
                            <p className='flex items-center gap-2'>
                                <span>Free</span>
                            </p>
                        </div>
                        <div className='font-semibold flex items-center justify-between gap-4'>
                            <p>Grand Total</p>
                            <p>{DisplayPriceInRs(notDiscountTotalPrice)}</p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col gap-4'>
                        <button onClick={handleOnlinePayment} className='py-2 px-4 bg-green-600 text-white font-semibold  hover:bg-green-700 rounded cursor-pointer'>Online Payment</button>
                        <button onClick={handleCashOnDelivery} className='py-2 px-4 border-2 border-green-600 font-semibold text-green-600 hover:bg-green-600 hover:text-white cursor-pointer rounded'>Cash on Delivery</button>
                    </div>

                </div>

            </div>

            {
                openAddress && (
                    <AddAddress close={() => setOpenAddress(false)}/> 
                )
            }

        </section>
    )
}

export default CheckOutPage
