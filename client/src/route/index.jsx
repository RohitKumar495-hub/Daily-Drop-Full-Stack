import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import SearchPage from '../pages/SearchPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import OtpVerification from '../pages/OtpVerification';
import ResetPassword from '../pages/ResetPassword';
import UserMenuMobile from '../pages/UserMenuMobile';
import DashBoard from '../layouts/DashBoard';
import Profile from '../pages/Profile';
import MyOrders from '../pages/MyOrders';
import Address from '../pages/Address';
import CategoryPage from '../pages/CategoryPage';
import SubCategoryPage from '../pages/SubCategoryPage';
import UploadProduct from '../pages/UploadProduct';
import Product from '../pages/ProductAdmin';
import ProductAdmin from '../pages/ProductAdmin';
import AdminPermission from '../layouts/AdminPermission';
import ProductListPage from '../pages/ProductListPage';
import ProductDisplayPage from '../pages/ProductDisplayPage';
import CartMobile from '../components/CartMobile';
import CheckOutPage from '../pages/CheckOutPage';
import OrderSuccess from '../pages/OrderSuccess';
import OrderCancel from '../pages/OrderCancel';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: 'search',
          element: <SearchPage />,
        },
        {
          path : 'register',
          element : <Register/>
        },
        {
          path: 'login',
          element : <Login/>
        },
        {
          path : 'forgot-password',
          element : <ForgotPassword/>
        },
        {
          path : 'verification-otp',
          element : <OtpVerification/>
        },
        {
          path : 'reset-password',
          element : <ResetPassword/> 
        },
        {
          path : 'user',
          element : <UserMenuMobile/>
        },
        {
          path : 'dashboard',
          element : <DashBoard/>,
          children : [
            {
              path : 'profile',
              element : <Profile/>
            },
            {
              path : 'myorders',
              element : <MyOrders/>
            },
            {
              path : 'address',
              element : <Address/>
            },
            {
              path : 'category',
              element : <AdminPermission>
                          <CategoryPage/>
                        </AdminPermission>
            },
            {
              path : 'subcategory',
              element : <AdminPermission>
                          <SubCategoryPage/>
                       </AdminPermission>
            },
            {
              path : 'upload-product',
              element : <AdminPermission>
                          <UploadProduct/>
                        </AdminPermission>
            },
            {
              path : 'product',
              element : <AdminPermission>
                          <ProductAdmin/>   
                        </AdminPermission>
            }
          ]
        },
        {
          path : ":category",
          children : [
            {
              path : ":subCategory",
              element : <ProductListPage/>
            }
          ]
        },
        {
          path : 'product/:product',
          element : <ProductDisplayPage />
        },
        {
          path : 'cart',
          element : <CartMobile />
        },
        {
          path : 'checkout',
          element : <CheckOutPage /> 

        },
        {
          path : 'success',
          element : <OrderSuccess /> 
        },
        { 
          path : 'cancel',
          element : <OrderCancel/>
        }
      ],
    },
  ],
  {
    future: {
        v7_relativeSplatPath: true,  // ✅ Fixes relative splat path warning
        v7_startTransition: true,    // ✅ Fixes React 18 state transition warning
      },
  }
);

export default router;
