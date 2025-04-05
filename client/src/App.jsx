import { Outlet, useLocation } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Toaster} from 'react-hot-toast';
import { useEffect } from 'react';
import fetchUserDetails from './utils/fetchUserDetails';
import { setUserDetails } from './store/userSlice';
import { useDispatch } from 'react-redux';
import { setAllCategory , setAllSubCategory , setLoadingCategory } from './store/productSlice';
import Axios from './utils/Axios';
import SummaryAPI from './common/SummaryApi';
import GlobalProvider from './provider/provider';
import CartMobileLink from './components/CartMobileLink';

function App() {

  const dispatch = useDispatch()
  const location = useLocation()

  const fetchUser = async () => {
    const userData = await fetchUserDetails()
    dispatch(setUserDetails(userData.data))
  }

  const fetchCategory = async () => {
          try{
              dispatch(setLoadingCategory(true))
              const response = await Axios({
                  ...SummaryAPI.getCategory
              })
  
              const { data : responseData} = response
              if(responseData.success){
                dispatch(setAllCategory(responseData.data))
              }
  
          } catch (error) {
  
          } finally {
              dispatch(setLoadingCategory(false))
          }
  }

  const fetchSubCategory = async () => {
        try{

            const response = await Axios({
                ...SummaryAPI.getSubCategory
            })

            const { data : responseData} = response
            if(responseData.success){
              dispatch(setAllSubCategory(responseData.data))
            }

        } catch (error) {

        } finally {
            
        }
  }

  useEffect(() => {
    fetchUser()
    fetchCategory()
    fetchSubCategory()
  } , [])

  return (
    <GlobalProvider>
      <Header/>
      <main className='min-h-[80vh]'>
        <Outlet/>
      </main>
      <Footer/>
      {
        location.pathname !== '/checkout' && (
          <CartMobileLink/>
        )
      }
      <Toaster/>
    </GlobalProvider>
  )
}

export default App
