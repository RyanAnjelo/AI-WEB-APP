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
             {stripeApiKey &&      
                <Route path="/payment" 
                element={
                <ProtectedRoute><Elements stripe={loadStripe(stripeApiKey)}>
                <Payment/>
              </Elements></ProtectedRoute>
                
                } 
                />
              }
            </Routes>
          
        </div>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
