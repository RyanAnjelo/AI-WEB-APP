import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom'
import { useEffect ,useState} from 'react';
import { useDispatch , useSelector } from 'react-redux'
import axios from 'axios'

import './App.css';
//Components
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';

//Products 
import ProductDetails from './components/products/ProductDetails';

//Cart
import Cart from './components/cart/Cart';
import ShippingCart from './components/cart/ShippingCart'
import ConfirmOrder from './components/cart/ConfirmOrder';
import Payment from './components/cart/Payment';
import OrderSucess from './components/cart/OrderSucess';
//Auth
import Login from './components/user/Login'
import Register from './components/user/Register';
import {loadUser} from './actions/users'
import store from './store'
import Profile  from './components/user/Profile'
import ProtectedRoute from './components/routes/ProtectedRoutes';
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

//Orders
import OrderList from './components/order/OrderList';

import OrderDetails from './components/order/OrderDetails';

// Admin 
import Dashboard from './components/admin/Dashboard';
import ProductList from './components/admin/ProductList'
import NewProduct from './components/admin/NewProduct';
import UpdateProducts from './components/admin/UpdateProducts';
import OrdersLists from './components/admin/OrdersLists';
import OrderProcessing from './components/admin/OrderProcessing';
import Users from './components/admin/Users';
import UpdateUser from './components/admin/UpdateUser';
import ReviewList from './components/admin/ReviewList';

function App() {

  const dispatch= useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())
  
    async function getStripApiKey() {
      const { data } = await axios.get('/api/v1/stripeapi');
      console.log(data);
      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

  }, [])

  const { user, isAuthenticated, loading } = useSelector(state => state.auth)
  
  

  return (
    <Router>
    <div className="App">
     <Header/>
     <div className="container container-fluid">
       <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/search/:keyword" element={<Home />}/>
            <Route path="/product/:id" element={<ProductDetails/>}  />
            
            <Route path="/login" element={<Login/>}  />
            <Route path="/register" element={<Register/>}  /> 
            <Route path="/password/forgot" element={<ForgotPassword/>}  /> 
            <Route path="/password/reset/:token" element={<ResetPassword/>}  /> 
            <Route path="profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
            <Route path="/profile/update" element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>}/>
            <Route path="/password/update" element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>}/>

            <Route path="/cart" element={<Cart/>}  /> 
            <Route path="/shipping" 
            element={user!==null ? <ProtectedRoute><ShippingCart/></ProtectedRoute>:<Navigate to="/login"/>
          }/>
             <Route path="/order/confirm" element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>}/>
             <Route path="/success" element={<ProtectedRoute><OrderSucess/></ProtectedRoute>}/>
             {stripeApiKey &&      
                <Route path="/payment" 
                element={
                <ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}>
                <Payment/>
              </Elements></ProtectedRoute>
              }/>}
               <Route path="/orders/me" element={<ProtectedRoute><OrderList/></ProtectedRoute>}/>
               <Route path="/order/:id" element={<ProtectedRoute><OrderDetails/></ProtectedRoute>}/>
               </Routes>
               </div>
               <Routes>
               <Route path="/dashboard" isAdmin={true} element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
               <Route path="/admin/products" isAdmin={true} element={<ProtectedRoute><ProductList/></ProtectedRoute>}/>
               <Route path="/admin/product" isAdmin={true} element={<ProtectedRoute><NewProduct/></ProtectedRoute>}/>
               <Route path="/admin/product/:id" isAdmin={true} element={<ProtectedRoute><UpdateProducts/></ProtectedRoute>}/>
               <Route path="/admin/orders" isAdmin={true} element={<ProtectedRoute><OrdersLists/></ProtectedRoute>}/>
               <Route path="/admin/order/process/:id" isAdmin={true} element={<ProtectedRoute><OrderProcessing/></ProtectedRoute>}/>
              <Route path="/admin/getAllUsers" isAdmin={true} element={<ProtectedRoute><Users/></ProtectedRoute>}/>
              <Route path="/admin/profile/update/:id" isAdmin={true} element={<ProtectedRoute><UpdateUser/></ProtectedRoute>}/>
              <Route path="/admin/reviews" isAdmin={true} element={<ProtectedRoute><ReviewList/></ProtectedRoute>}/>

        
        </Routes>
          
      
            {!loading && (!isAuthenticated || user.role !== 'admin') && (
          <Footer />
        )}
    </div>
    </Router>
  );
}

export default App;
