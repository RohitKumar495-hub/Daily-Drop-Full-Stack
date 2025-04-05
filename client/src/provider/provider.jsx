import { createContext , useContext, useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryAPI from "../common/SummaryApi";
import { useDispatch, useSelector } from "react-redux";
import { handleAddItemCart } from "../store/cartProduct";
import AxiosToastError from '../utils/AxiosToastError'
import toast from "react-hot-toast";
import { PriceWithDiscount } from '../utils/PriceWithDiscount'
import { handleAddAddress } from "../store/addressSlice";
import { setOrder } from "../store/orderSlice";


export const GlobalContext = createContext(null)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalProvider = ({children}) => {

    const dispatch = useDispatch()

    const cartItem = useSelector(state => state.cartItem.cart)
    const [totalPrice , setTotalPrice] = useState(0)
    const [totalQty , setTotalQty] = useState(0)  
    const [notDiscountTotalPrice , setNotDiscountTotalPrice] = useState(0)
    const user = useSelector(state => state.user)


    const fetchCartItem = async () => {
        try {
          
          const response = await Axios({
            ...SummaryAPI.getCartItem
          })
    
          const { data : responseData } = response
    
          if(responseData.success){
            dispatch(handleAddItemCart(responseData.data))
            console.log(responseData)
          }
    
        } catch (error) {
          console.log(error)
        }
    }

    const updateCartItem  = async (id , qty) => {
        try {

          const response = await Axios({
            ...SummaryAPI.updateCartItemQty,
            data : {
              _id : id ,
              qty : qty
            }
          })

          const { data : responseData } = response

          if(responseData.success) {
            // toast.success(responseData.message)
            fetchCartItem()
            return responseData
          }
          
        } catch (error) {
          AxiosToastError(error)
          return error
        }
    }

    const deleteCartItem = async (cartId) => {
        try {
          
          const response = await Axios({
            ...SummaryAPI.deleteCartItem,
            data : {
              _id : cartId,
            }
          })

          const { data : responseData } = response

          if(responseData.success){
            toast.success(responseData.message)
            fetchCartItem()
          }

        } catch (error) {
          AxiosToastError(error)
        }
    }

    const fetchAddress = async () => {
      try {
        
        const response = await Axios({
          ...SummaryAPI.getAddress
        })

        const { data : responseData } = response

        if(responseData.success) {
          dispatch(handleAddAddress(responseData.data))
        }

      } catch (error) {
        AxiosToastError(error)
      }
    } 

    const fetchOrder = async () => {
      try {

        const response = await Axios({
          ...SummaryAPI.getOrderItems,
        })

        const { data : responseData } = response

        if(responseData.success){
          dispatch(setOrder(responseData.data))
        }
        
      } catch (error) {
        console.log(error)
      }
    }

      useEffect(() => {
        const qty = cartItem.reduce((prev , curr) => {
          return prev + curr.quantity
        } , 0)
        setTotalQty(qty)
    
        const tPrice = cartItem.reduce((prev , curr) => {
          return prev + (PriceWithDiscount(curr.productId.price , curr.productId.discount) * curr.quantity)
        } , 0)
        setTotalPrice(tPrice)

        const notDiscountTotalPrice = cartItem.reduce((prev , curr) => {
          return prev + (PriceWithDiscount(curr.productId.price) * curr.quantity)
        } , 0)
        setNotDiscountTotalPrice(notDiscountTotalPrice)
    
      }, [cartItem])

      const handleLogOut = () => {
        localStorage.clear()
        dispatch(handleAddItemCart([]))
      }

      useEffect(() => {
        fetchCartItem()
        handleLogOut()
        fetchAddress()
        fetchOrder()
      }, [user])

    return (
        <GlobalContext.Provider value={
          { 
            fetchCartItem , 
            updateCartItem , 
            deleteCartItem ,
            totalPrice ,
            totalQty,
            notDiscountTotalPrice,
            fetchAddress,
            fetchOrder
          }
          }>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider