import React, { useEffect, useState } from 'react'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import SummaryAPI from '../common/SummaryApi'
import Loading from '../components/Loading'
import CardProduct from '../components/CardProduct'
import { Link , useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { validURLConvert } from '../utils/validURLConvert'

const ProductListPage = () => {

  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [totalPage, setTotalPage] = useState(1)
  const params = useParams()
  const [displaySubCategory, setDisplaySubCategory] = useState([])
  const allSubCategory = useSelector(state => state.product.allsubCategory)

  const subCategory = params?.subCategory.split("-")
  const subCategoryName = subCategory?.slice(0, subCategory?.length - 1).join(" ")

  const categoryId = params.category.split("-").slice(-1)[0]
  const subCategoryId = params.subCategory.split("-").slice(-1)[0]

  const fetchProductData = async () => {

    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryAPI.getProductByCategoryAndSubCategory,
        data: {
          categoryId: categoryId,
          subCategoryId: subCategoryId,
          page: page,
          limit: 8
        }
      })

      const { data: responseData } = response

      if (responseData.success) {
        if (responseData.page == 1) {
          setData(responseData.data)
        } else {
          setData([...data, ...responseData])
        }
        setTotalPage(responseData.totalCount)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductData()
  }, [params])

  useEffect(() => {
    const sub = allSubCategory.filter(s => {
      const filterData = s.category.some(el => {
        return el._id === categoryId
      })
      return filterData ? filterData : null
    })

    setDisplaySubCategory(sub)
  }, [params, allSubCategory])

  return (
    <section className='sticky top-24 lg:top-20'>
      <div className='sticky mx-6 grid grid-cols-[90px_minmax(0,1fr)] md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)]'>
        {/* sub category */}
        <div className='min-h-[88vh] grid gap-2 shadow-md max-h-[88vh] overflow-scroll scrollbarCustom bg-wite py-2'>
          {
            displaySubCategory.map((s, index) => {
              const link = `/${validURLConvert(s?.category[0]?.name)}-${s?.category[0]?._id}/${validURLConvert(s.name)}-${s._id}`
              return (
                <Link to={link} className={`w-full gap-2 p-2 lg:flex bg-white items-center lg:w-full lg:h-16 box-border border-b border-gray-200 
                    hover:!bg-green-300 cursor-pointer
                    ${subCategoryId === s._id ? "!bg-green-100" : "!bg-white"}`}>
                  <div className='w-fit max-w-28 mx-auto lg:mx-0 bg-white rounded box-border'>
                    <img
                      src={s.image}
                      alt={s.name}
                      className='w-14 lg:h-14 lg:w-12 h-full object-scale-down'
                    />
                  </div>
                  <p className='-mt-6 lg:mt-0 text-xs text-center lg:text-left lg:text-base'>{s.name}</p>
                </Link>
              )
            })
          }
        </div>

        {/* product */}
        <div className='sticky top-20 p-4'>
          <div className='bg-white shadow-md p-4 z-10 rounded'>
            <h3 className='font-semibold'>{subCategoryName}</h3>
          </div>
          <div>

          <div className='min-h-[80vh] max-h-[80vh] relative'>
            <div className='grid grid-cols-1 p-4 gap-4 md:grid-cols-3 lg:grid-cols-4'>
                {
                  data.map((p, index) => {
                    return (
                      <CardProduct
                        data={p}
                        key={p._id + "productSubCategory" + index}

                      />
                    )
                  })
                }
              </div>
          </div>
            {
              loading && (
                <Loading />
              )
            }
          </div>
        </div>
      </div>

    </section>
  )
}

export default ProductListPage
