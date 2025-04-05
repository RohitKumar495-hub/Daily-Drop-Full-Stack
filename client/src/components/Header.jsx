import React, { useEffect, useState } from 'react';
// import logo from '../assets/images/logo1.webp';
import logo from '../assets/images/logo2.png' 
import Search from './Search';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaRegUserCircle } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import useMobile from '../hooks/useMobile';
import { useSelector } from 'react-redux';
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from './UserMenu';
import DisplayPriceInRs from '../utils/DisplayPriceInRs';
import { useGlobalContext } from '../provider/provider';
import DisplayCartItem from './DisplayCartItem';

const Header = () => {

  const navigate = useNavigate()
  const [ isMobile ] = useMobile()
  const location = useLocation()
  const { totalPrice , totalQty , notDiscountTotalPrice } = useGlobalContext()
  const isSearchPage = location.pathname === '/search'
  const user = useSelector((state) => state ?.user)
  const [ openUserMenu , setOpenUserMenu ] = useState(false)
  const cartItem = useSelector(state => state.cartItem.cart)
  const [openCartSection , setOpenCartSection] = useState(false)
  // const [totalPrice , setTotalPrice] = useState(0)
  // const [totalQty , setTotalQty] = useState(0)   

  const handleCloseUserMenu = () => {
    setOpenUserMenu(false)
  }

  const redirectToLoginPage = () => {
        navigate('/login')
  }

  const handleMobileUser = () => {
    if(!user._id){
      navigate('/login')
      return
    }

    navigate('/user')
    
  }

  // total item and total price

  // useEffect(() => {
  //   const qty = cartItem.reduce((prev , curr) => {
  //     return prev + curr.quantity
  //   } , 0)
  //   setTotalQty(qty)

  //   const tPrice = cartItem.reduce((prev , curr) => {
  //     return prev + (curr.productId.price * curr.quantity)
  //   } , 0)
  //   setTotalPrice(tPrice)

  // }, [cartItem])

  return (
    <header className="bg-white lg:h-20 h-26 lg:shadow-md sticky top-0 px-6 lg:flex lg:justify-center lg:flex-col z-40">

        {
            !(isSearchPage && isMobile)  && (

              <div className="flex justify-between items-center">

                  {/*  Logo */}
                    <div className="min-w-[200px]">
                        <Link to="/">
                          {/* Logo for small screens */}
                          <img src={logo} alt="logo" className="block lg:hidden w-20" />

                          {/* Logo for medium+ screens */}
                          <img src={logo} alt="logo" className="hidden lg:block w-36" />
                        </Link>
                    </div>


                  {/* Search section for big screen*/}

                  <div className='hidden lg:block'>
                    <Search/>
                  </div>

                  {/* Login and My Cart */}
                  <div>

                      {/* user icons display in only mobile version */}

                      <button className='text-neutral-600 lg:hidden' onClick={handleMobileUser}>
                        <FaRegUserCircle size={28}/>
                      </button>

                      {/* desktop version  */}

                      <div className='lg:flex gap-10 items-center hidden '>
                        {
                          user?._id ? (
                            <div className='relative'>
                              <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex select-none items-center gap-1 cursor-pointer'>
                                <p>Account</p>
                                {
                                  openUserMenu ? (
                                    <GoTriangleUp size={20}/>
                                  ) : (
                                      <GoTriangleDown size={20}/>
                                  )
                                }
                              </div>
                              {
                                openUserMenu && (
                                    <div className='absolute right-0 top-12'>
                                      <div className='bg-white rounded p-4 min-w-52 md:shadow-lg'>
                                            <UserMenu close={handleCloseUserMenu}/>
                                      </div>
                                    </div>
                                  )
                              }
                            </div>
                          ) : (
                                  <button onClick={redirectToLoginPage} type='button' className='cursor-pointer text-lg px-2'>Login</button>

                          )
                        }

                        {/* add to cart buttton */}

                        <button onClick={() => setOpenCartSection(true)} className='flex items-center cursor-pointer gap-2 bg-green-700 hover:bg-green-600 px-3 py-2 rounded text-white'>
                          <div className='animate-bounce'>
                            {/* add to cart icon */}
                            <TiShoppingCart size={34}/>
                          </div>
                          <div className='font-semibold text-sm'>
                            {
                              cartItem[0] ? (
                                <div>
                                  <p>{totalQty} Items</p>
                                  <p>{DisplayPriceInRs(notDiscountTotalPrice)}</p>
                                </div>
                              ) : (
                                <p>My Cart</p>
                              )
                            }
                          </div>
                        </button>
                        
                      </div>
                  </div>

              </div>
            )
        }
        
        {/* Search section for small screen */}

      <div className='lg:container md:mx-auto md:px-2 lg:hidden'>
        <Search/>
      </div>

      {
        openCartSection && (
          <DisplayCartItem close={() => setOpenCartSection(false)}/>
        )
      }

    </header>
  );
}

export default Header;
