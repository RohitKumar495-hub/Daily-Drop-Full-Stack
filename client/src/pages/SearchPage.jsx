import React, { useEffect, useState } from 'react'
import CardLoading from '../components/CardLoading'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryAPI from '../common/SummaryApi'
import CardProduct from '../components/CardProduct'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation } from 'react-router-dom'
import noResultFoundImage from '../assets/images/nothing here yet.webp'

const SearchPage = () => {

  const [data , setData] = useState([])
  const [loading , setLoading] = useState(true)
  const loadingArrayCard = new Array(12).fill(null)
  const [page , setPage] = useState(1)
  const [totalPage , setTotalPage] = useState(1)
  const params = useLocation()
  const searchText = params?.search?.slice(3)

  console.log(params?.search?.slice(3))

  const fetchData = async () => {
      try {

        setLoading(true)

        const response = await Axios({
          ...SummaryAPI.searchProduct,
          data : {
            search : searchText,
            page : page 
          }
        })

        const { data : responseData } = response

        if(responseData.success){
            if(responseData.page == 1){
              setData(responseData.data)
            }else {
              setData((prev) => {
                return [
                  ...prev ,
                  ...responseData.data
                ]
              })
            }

            setTotalPage(responseData.totalPage)
            console.log(responseData)
        }
        
      } catch (error) {
        AxiosToastError(error)
      } finally {
        setLoading(false)
      }
  }

  useEffect(() => {
    fetchData()
  } , [page , searchText])

  console.log("page",page)

  const handleFetchMore = () => {
    if(totalPage > page)
    {
      setPage(prev => prev + 1)
    }
  }



  return (
    <section className='bg-white'>
      <div className='container mx-auto p-4'>
        <p className='font-semibold'>Search Result: {data.length}</p>

          <InfiniteScroll 
            dataLength={data.length}
            hasMore={true}
            next={handleFetchMore}
          >

            <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 py-4'>


            {
              data.map((p,index) => {
                return (
                  <CardProduct data={p} key={p._id+"searchProduct"+index}/>
                )
              })
            }

            {/* loading data */}
              {
                loading && (
                  loadingArrayCard.map((_ , index) => {
                    return (
                      <CardLoading key={"loadingsearchPage"+index}/>
                    )
                  })
                )
              }
              </div>
          </InfiniteScroll>

          {
              //  no data 

              !data[0] && !loading && (
                <div className='flex justify-center flex-col items-center w-fit mx-auto'>
                  <img 
                    src={noResultFoundImage} 
                    alt=""
                    className='w-full h-full max-w-sm max-h-sm' 
                  />
                  <p className='font-semibold my-2 '>No Data Found</p>
                </div>
              )
            }

      </div>
    </section>
  )
}

export default SearchPage
