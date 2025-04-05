import React from 'react'
import { useSelector } from 'react-redux'
import NoData from '../components/NoData'
import { useGlobalContext } from '../provider/provider'

const MyOrders = () => {

  const orders = useSelector(state => state.orders.order)

  console.log(orders)

  
  return (
    <div className='grid gap-3 '>
      <div className='border rounded shadow-md px-4 py-2 border-gray-200'>
        <h1 className='font-semibold'>Orders</h1>
      </div>
      {
        !orders[0] && (
          <NoData/>
        )
      }

      {
        orders.map((order , index) => {
          
          return (

              <div key={order._id+index+"order"} className='border border-gray-200 text-sm rounded p-4'>
                <p>Order No: {order?.orderId}</p>
                <div className='flex gap-3'>
                  <img 
                    src={Array.isArray(order.product_details.image[0]) 
                        ? order.product_details.image[0][0] 
                        : order.product_details.image[0]} 
                    alt="" 
                    className='w-14 h-14'
                />
                <p className='font-medium'>{order.product_details.name}</p>
                </div>
              </div>
          )
        })
      }


    </div>
  )
}

export default MyOrders
