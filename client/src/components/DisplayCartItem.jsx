import React from 'react'
import { IoClose } from 'react-icons/io5'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../provider/provider'
import DisplayPriceInRs from '../utils/DisplayPriceInRs'
import { FaCaretRight } from "react-icons/fa";
import { useSelector } from 'react-redux'
import AddToCartButton from './AddToCartButton'
import { PriceWithDiscount } from '../utils/PriceWithDiscount'
import emptyCartItemImage from '../assets/images/empty_cart_item.png'
import toast from 'react-hot-toast'


const DisplayCartItem = ({close}) => {

  const { notDiscountTotalPrice , totalPrice , totalQty  } = useGlobalContext()
  const cartItem = useSelector(state => state.cartItem.cart)
  const user = useSelector(state => state.user)
  const navigate = useNavigate()

  const redirectToCheckOutPage = () => {
    if(user._id){
      navigate('/checkout')
      if(close)
      {
        close()
      }
      return
    }

    toast.inform("Please Login")

  }


  return (
    <section className='bg-neutral-900/70 fixed top-0 bottom-0 right-0 left-0 z-50'>
        <div className='bg-white w-full max-w-sm min-h-screen max-h-scrren ml-auto'>

           <div className='flex items-center p-4 shadow-md gap-3 justify-between rounded'>
                <h2 className='font-semibold'>Cart</h2>
                <Link to={'/'} className='lg:hidden'>
                    <IoClose size={25}/> 
                </Link>
                <button onClick={close} className='cursor-pointer lg:block hidden'>
                <IoClose size={25}/> 
                </button>
            </div> 

            <div className='min-h-[75vh] lg:min-h-[80vh] h-full max-h-[calc(100vh-150px)] bg-blue-50 p-2 flex flex-col gap-4'>
              {/* Display items */}

              {
                cartItem[0] ? (
                  <>
                      <div className='flex items-center justify-between py-2 px-4 bg-blue-100 text-blue-500 rounded-full'>
                        <p>Your total savings</p>
                        <p>{DisplayPriceInRs(totalPrice - notDiscountTotalPrice)}</p>
                      </div>
        
                      <div className='bg-white rounded-lg p-2 grid gap-5 overflow-auto'>

                          {
                            cartItem[0] && (
                              cartItem.map((item , index) => {
                                const firstImage = Array.isArray(item.productId.image) && Array.isArray(item.productId.image[0]) 
                                ? item.productId.image[0][0]
                                : ''
                                return (
                                  <div key={item._id+"cartItemDisplay"} className='flex w-full gap-4'>
                                    <div className='w-16 h-16 min-h-16 min-w-16 bg-red-500 border border-gray-200 rounded'>
                                        {firstImage ? (
                                          <img 
                                            src={firstImage} 
                                            alt={`Product ${index}`} 
                                            className='object-scale-down'
                                          />
                                        ) : (
                                          <p>No Image Available</p>
                                        )}
                                    </div>
                                    <div className='w-full max-w-sm text-xs'>
                                      <p className='text-ellipsis line-clamp-2'>{item?.productId.name}</p>
                                      <p className='text-neutral-500'>{item?.productId.unit}</p>
                                      <p className='font-semibold'>{DisplayPriceInRs(PriceWithDiscount(item?.productId?.price , item?.productId?.discount))}</p>
                                    </div>
                                    <div>
                                      <AddToCartButton data={item?.productId}/>
                                    </div>
                                  </div>

                                ) 
                              })
                            ) 
                          }
                      </div>

                      <div className='bg-white p-4 rounded'>
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

                  </>

                ) : (
                  <div className='flex flex-col items-center justify-center gap-6 text-neutral-100'>
                    <div>
                      <img src={emptyCartItemImage} alt="Empty cart" className='w-full h-full object-scale-down'/>
                    </div>
                      <Link onClick={close} to={'/'} className='bg-green-600 rounded p-2 cursor-pointer hover:bg-green-700'>Shop Now</Link>
                  </div>
                )
              }

            </div>

              {
                cartItem[0] && (
                  <div className='p-2'>
                    <div className='bg-green-700 text-neutral-100 px-4 font-bold text-base py-4 static bottom-3 rounded flex items-center gap-4 justify-between'>
                        <div>
                          {DisplayPriceInRs(notDiscountTotalPrice)}
                        </div>

                        <button onClick={redirectToCheckOutPage} className='flex items-center gap-1 cursor-pointer'>
                          Proceed
                          <span><FaCaretRight/></span>
                        </button>
                    </div>
                  </div>
                )
              }

        </div>
    </section>
  )
}

export default DisplayCartItem
