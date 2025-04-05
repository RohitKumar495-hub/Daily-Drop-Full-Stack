import React, { useEffect, useState } from 'react'
import { TypeAnimation } from 'react-type-animation';
import { IoSearchSharp } from "react-icons/io5";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';

const Search = () => {

    const navigate = useNavigate()
    const location = useLocation()
    const [ isMobile ] = useMobile()
    const params = useLocation()
    const searchText = params.search.slice(3)
    
    const [isSearchPage , setIsSeachPage] = useState(false)
    
    useEffect(() => {
      const isSearch = location.pathname === '/search'
      setIsSeachPage(isSearch)
    } , [location])
    
    const redirectToSearchPage = () => {
      navigate('/search')
    }

    const handleOnChange = (e) => {
      const value = e.target.value
      const url = `/search?q=${value}`
      navigate(url)
    }

  return (
    <div className='w-full min-w-[280px] lg:min-w-[420px] h-12 rounded-lg border border-gray-300 overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-primary-200'>

      <div className='flex items-center'>


        {
           (isMobile && isSearchPage) ? (
                <Link to='/' className='items-center mx-3 group-focus-within:text-primary-200 m-1 p-2 bg-white rounded-full shadow-md'>
                    <FaArrowLeft size={18}/>
                </Link>
           ) : (
                <button className='justify-center items-center h-full p-3 group-focus-within:text-primary-200'>
                    <IoSearchSharp size={20}/>
                </button>
           )
        }


      </div>

      <div className='w-full'>

      {
        !isSearchPage ? (
          // not in search page
            <div onClick={redirectToSearchPage}>
              <TypeAnimation
                  sequence={[
                      // Same substring at the start will only be typed out once, initially
                      'Search "milk"',
                      1000, // wait 1s before replacing "Mice" with "Hamsters"
                      'Search "bread"',
                      1000,
                      'Search "sugar"',
                      1000,
                      'Search "panner"',
                      1000,
                      'Search "eggs"',
                      1000,
                      'Search "chocolate"',
                      1000,
                      'Search "curd"',
                      1000,
                      'Search "rice"',
                      1000,
                      'Search "chips"',
                      1000
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
            />
            </div>
        ) : (
         // when in search page
            <div className='w-full'>
              <input 
                type="text" 
                autoFocus
                defaultValue={searchText}
                placeholder='Search for aata dal and more...'
                className='bg-transparent w-full outline-none'
                onChange={handleOnChange}
              />
            </div>
        )
      }

      </div>


    </div>
  )
}

export default Search
