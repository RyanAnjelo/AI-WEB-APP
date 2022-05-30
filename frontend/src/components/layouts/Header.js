import React, { Fragment  } from 'react'
import Search from './Search'
import { Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import '../../App.css'
import  {logout} from '../../actions/users'


import { FaShoppingCart,FaUserAlt} from "react-icons/fa";
import { Button } from 'react-bootstrap'


const Header = () => {
const alert= useAlert();
const dispatch=useDispatch();

const logoutHandler = () =>{
  dispatch(logout());
  alert.success('Logged out sucessfully');
}

const { user } = useSelector(state => state.auth)
const { cartItems } = useSelector(state => state.cart)
  return ( 
    <Fragment>
     
         <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to='/'> <img src="./imgs/logo.png" style={{width:'190px',height:'55px'}} alt='Ambay'/></Link>
         
        </div>
        </div>
        
          <div className="col-12 col-md-6 mt-2 mt-md-0 ">
            <Search />
          </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center ">
           <div className="ml-4 dropdown d-inline">
              
              <Link to="#!" className="btn dropdown-toggle text-white mr-4 rounded-circle    "  type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <FaShoppingCart />
               <span className="ml-2" id="cart_count">{cartItems.length}</span>
            </Link>
          <div className="dropdown-menu mt-3" aria-labelledby="dropDownMenuButton">
                 {cartItems.map(item => (
                        <Fragment>
                            <hr />
                            <div className="cart-item my-1" key={item.product}>
                                <div className="row">
                                    <div className="col-1 col-sm-1">
                                        <img src={item.image} alt={item.name} height="30" width="25" />
                                    </div>
                                    <div className="col-4 col-sm-4 ml-4 mt-sm-0">
                                        <p><b>${(item.quantity * item.price).toFixed(2)}</b></p>
                                   </div>
                        
                                 
                                </div>
                     </div>
                    
                                     
                   
                                    
                     <hr />
                       <Button  id="checkout_btn" className="btn btn-primary btn-block"><Link className="dropdown-item3" to="/cart" style={{ textDecoration: 'none', color:'white', backgroundColor:'none'}}>Checkout</Link></Button> 
                   
                        </Fragment>
                    ))}
              </div>
            </div>
            
        
          {user ? (
            <div className="ml-4 dropdown d-inline">
              <Link to="#!" className="btn dropdown-toggle text-white mr-4 " type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                <figure className="avatar avatar-nav">
                  <img
                    src={user.avatar && user.avatar.url}
                    alt={user && user.name}
                    className="rounded-circle"
                  />
                </figure>
                <span>{user && user.name}</span>
              </Link>
              <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                {user && user.role === 'admin' && (
                  <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                )}
                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                <Link className="dropdown-item" to="/profile">Profile</Link>
                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler} >
                  Logout
                </Link>

              </div>

            </div>
          ) :
             <div className="ml-4 dropdown d-inline">
              
              <Link to="#!" className="btn dropdown-toggle text-white mr-4 rounded-circle    "  type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
           <FaUserAlt/> </Link>
          <div className="dropdown-menu mt-3" aria-labelledby="dropDownMenuButton">
                <Link className="dropdown-item cl" to="/login">Login </Link>
               
              </div>
            </div>
            
          }
            
            
      </div>
    </nav>
    
    </Fragment>
  )
}

export default Header