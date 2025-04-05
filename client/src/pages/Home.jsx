import React, { useEffect } from 'react'
import banner from '../assets/images/banner.jpg'
import mobileBanner from '../assets/images/banner-mobile.jpg'
import { useSelector } from 'react-redux'
import { validURLConvert } from '../utils/validURLConvert'
import { Link, useNavigate } from 'react-router-dom'
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'

const Home = () => {

  const loadingCategory = useSelector(state => state.product.loadingCategory)
  const categoryData = useSelector(state => state.product.allCategory)
  const subCategoryData = useSelector(state => state.product.allsubCategory)
  const navigate = useNavigate()

  const handleRedirectProductListPage = (id , cat) => {
    console.log(id , cat)
    const subcategory = subCategoryData.find(sub => {
      const filterData = sub.category.some(c => {
        return c._id == id
      })

      return filterData ? true : null
    })

    const url = `/${validURLConvert(cat)}-${id}/${validURLConvert(subcategory.name)}-${subcategory._id}`
    navigate(url)
  }

  useEffect(() => {

  } , [categoryData])


  return (
    <section className='bg-white'> 

    {/* banner section  */}
      <div className='mx-auto'>
        <div className={`rounded w-full h-full min-h-48 bg-blue-100 ${!banner && "animate-pulse my-2"}`}>
          <img 
            src={banner} 
            alt="banner" 
            className='w-full h-full hidden lg:block'
          />
          <img 
            src={mobileBanner} 
            alt="banner" 
            className='w-full h-full lg:hidden mt-4'
          />
        </div>
      </div>  

      {/* Card loading section & display category of product */}

      <div className='p-4 mx-auto grid grid-cols-5 md:grid-cols-9 gap-2'>
        {
          loadingCategory ? (
            new Array(12).fill(null).map((category,index) => {
              return (
                <div key={index+"loadingcategory"} className='bg-white rounded p-4 min-h-36 grid gap-2 shadow animate-pulse'>
                  <div className='bg-blue-100 min-h-24 rounded'></div>
                  <div className='bg-blue-100 h-8 rounded'></div>
                </div>
              )
            })
          ) : (
            categoryData.map((cat , index) => {
              return (
                  <div key={cat._id+"displayCategory"} className='w-full h-full' onClick={() =>  handleRedirectProductListPage(cat._id , cat.name)}>
                    <div>
                      <img 
                        src={cat.image} 
                        alt={cat.name} 
                        className='w-full h-full object-scale-down'
                      />
                    </div>
                  </div>
              )
            })
          )
        }
      </div>

      {/* display category wise product  display */}

      {
        categoryData.map((c , index) => {
          return (
            <CategoryWiseProductDisplay 
              key={c._id+"CategoryWiseId"} 
              id={c._id}  
              name={c?.name}
            />

          )
        })
      }
    </section>
  )
}


export default Home
