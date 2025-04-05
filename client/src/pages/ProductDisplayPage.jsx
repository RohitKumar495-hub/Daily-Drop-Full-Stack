  import { React, useEffect, useRef, useState } from 'react'
  import {useParams} from 'react-router-dom'
  import SummaryAPI from '../common/SummaryApi'
  import Axios from '../utils/Axios'
  import AxiosToastError from '../utils/AxiosToastError'
  import { FaAngleLeft } from "react-icons/fa";
  import { FaAngleRight } from "react-icons/fa";
  import DisplayPriceInRs from '../utils/DisplayPriceInRs'
  import Divider from '../components/Divider'
  import deliveryIcon from '../assets/images/minute_delivery.jpeg'
  import bestPriceIcon from '../assets/images/best_price.jpg'
  import wideAssortmentIcon from '../assets/images/wide_assortment.png'
  import { PriceWithDiscount } from '../utils/PriceWithDiscount'
  import AddToCartButton from '../components/AddToCartButton'

  const ProductDisplayPage = () => {

    const [data , setData] = useState({
      name : '',
      image : []

    }) 

    const [image , setImage] = useState('')

    const [loading , setLoading] = useState(false)

    const imageContainer = useRef()

    const params = useParams()
    let productId = params.product?.split("-")?.slice(-1)[0]

    const fetchProductDetails = async () => {
      try {
        
        setLoading(true)
        const response = await Axios({
          ...SummaryAPI.getProductDetails,
          data : {
            productId : productId
          }
        })

        const { data : responseData } = response

        console.log(responseData.data.image[0])

        if(responseData.success){
          setData(responseData.data)
          setImage(responseData.data.image[0][0])
        }
      
      } catch (error) {
        AxiosToastError(error)
      } finally{
        setLoading(false)
      }
    }

    useEffect(() => {
      fetchProductDetails()
    }, [params])

    const handleScrollRight = () => {
      imageContainer.current.scrollLeft += 100
    }

    const handleScrollLeft = () => {
      imageContainer.current.scrollLeft -= 100
    }

    console.log("productData" , data)

    return (
      <section className='container mx-auto p-4 grid lg:grid-cols-2'>

        {/* left part  */}
        <div className=''>

          <div className='lg:min-h-[65vh] lg:max-h-[65vh] bg-white min-h-56 max-h-56 rounded h-full w-full'>
            <img 
              src={image} 
              className='w-full h-full object-scale-down'
            />
          </div>

          <div className='flex items-center justify-center gap-3 my-2'>
              {
                data.image[0]?.map((img , index) => {
                  return (
                    <div key={img+index+"point"} className={`bg-slate-200 w-3 h-3 lg:w-5 lg:h-5 rounded-full ${img === image ? "!bg-red-300" : ""}` }></div>
                  )
                })
              }
          </div>

          <div className='grid relative'>

            <div ref={imageContainer} className='flex relative z-10 gap-4 w-full overflow-x-auto scrollbar-none'>
              {
                data.image[0]?.map((img,index) => {
                  return (
                    <div className='w-20 h-20 shadow-md min-h-20 min-w-20' key={img+index}>
                      <img 
                        src={img} 
                        alt='mini-product' 
                        onClick={() => setImage(img)}
                        className='w-full h-full object-scale-down cursor-pointer'
                      />
                    </div>
                  )
                })
              }
            </div>

            <div className='w-full -ml-3 h-full flex justify-between items-center absolute'>
              <button onClick={handleScrollLeft} className='z-10 bg-white p-1 rounded-full shadow-lg cursor-pointer relative hidden lg:block md:block'>
                <FaAngleLeft/>
              </button>
              <button onClick={handleScrollRight} className='z-10 bg-white p-1 rounded-full shadow-lg cursor-pointer relative hidden md:block lg:block'>
                <FaAngleRight/>
              </button>
            </div>

          </div>

        </div>

        {/* right part  */}
          
        <div className='p-4 lg:pl-7 text-base lg:text-lg'>
              <p className='bg-green-300 w-fit px-2 rounded-full'>10 Min</p>
              <h2 className='text-lg font-semibold lg:text-3xl'>{data.name}</h2>
              <p className=''>{data.unit}</p>
              <Divider/>
              <div>
                <p className=''>Price</p>
                <div className='flex items-center gap-2 lg:gap-4'>
                  <div className='border border-green-600 px-4 py-2 rounded bg-green-50 w-fit'>
                    <p className='font-semibold text-lg lg:text-xl'>{DisplayPriceInRs(PriceWithDiscount(data.price , data.discount))}</p>
                  </div>
                  {
                    data.discount && (
                      <p className='line-through'>{DisplayPriceInRs(data.price)}</p>
                    )
                  }
                  {
                    data.discount && (
                      <p className='font-bold text-green-600 lg:text-2xl'>{data.discount}% <span className='text-base text-neutral-500'>Discount</span></p>
                    )
                  }
                </div>
              </div>
              
              {
                  data.stock === 0 ? (
                    <p className='text-lg text-red-500 my-2'>Out of Stock</p>
                  ) : (
                  <div className='my-4'>
                    <AddToCartButton data={data} />
                  </div>
                )
              }
              
              <h2 className='font-semibold'>Why Shop from Daily Drop ?</h2>
              <div>

                  <div className='lg:flex md:flex items-center gap-4 my-4'>
                    <img 
                      src={deliveryIcon} 
                      alt="superfast-delivery" 
                      className='w-40 h-20'
                    />
                    <div className='text-sm'>
                      <div className='font-semibold'>Superfast delivery</div>
                      <p>Get your order delivered to your doorstep at the earliest from dark stores near you.</p>
                    </div>
                  </div>

                  <div className='lg:flex md:flex items-center gap-4 my-4'>
                    <img 
                      src={bestPriceIcon} 
                      alt="Best price offers" 
                      className='w-40 h-20'
                    />
                    <div className='text-sm'>
                      <div className='font-semibold'>Best Prices & Offers</div>
                      <p>Best price destination offers directly form the manufactures.</p>
                    </div>
                  </div>

                  <div className='lg:flex md:flex items-center gap-4 my-4'>
                    <img 
                      src={wideAssortmentIcon} 
                      alt="Best price offers" 
                      className='w-40 h-20'
                    />
                    <div className='text-sm'>
                      <div className='font-semibold'>Wide Assortment</div>
                      <p>Choose from 5000+ products accross food personal care , household & other categories</p>
                    </div>
                  </div>
                  
              </div>
        </div>

        {/* only for mobile */}

        <div className='my-4 grid gap-3'>
              <div>
                <p className='font-semibold'>Description</p>
                <p className='text-base '>{data.description}</p>
              </div>

              <div>
                <p className='font-semibold'>Unit</p>
                <p className='text-base '>{data.unit}</p>
              </div>

        </div>


      </section>
    )
  }

  export default ProductDisplayPage
