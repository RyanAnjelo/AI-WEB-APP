import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import { useEffect } from 'react';
import './App.css';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import Home from './components/Home';
import ProductDetails from './components/products/ProductDetails';
import Login from './components/user/Login'
import Register from './components/user/Register';
import {loadUser} from './actions/users'
import store from './store'
import { useDispatch , useSelector } from 'react-redux'

function App() {

  const dispatch= useDispatch();
  //const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {
    store.dispatch(loadUser())

    //async function getStripApiKey() {
    //  const { data } = await axios.get('/api/v1/stripeapi');

      //setStripeApiKey(data.stripeApiKey)
    //}

    //getStripApiKey();

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
           
            </Routes>
        </div>
     <Footer/>
    </div>
    </Router>
  );
}

export default App;
