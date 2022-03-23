import React, { Fragment  } from 'react'
import Search from './Search'
import {Route, useNavigate,Routes, Router, Link} from 'react-router-dom'
import {useDispatch , useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import '../../App.css'

const Header = () => {
const alert= useAlert();
const dispatch=useDispatch();

const { user, loading } = useSelector(state => state.auth)
  return ( 
    <Fragment>
     
         <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <img src="./imgs/logo.png" style={{width:'190px',height:'55px'}}/>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
      <Search />
      </div>
      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      <Link to="/cart" style={{textDecoration:'none'}}>
      <span id="cart" className="ml-3">Cart</span>
      <span className="ml-1" id="cart_count">2</span>
      </Link>
      {user ? (
        
         <div className="ml-4 dropdown d-inline">
                            <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                       // alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link>
        </div>

      ) : !loading &&  <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>}
     

        
      </div>
    </nav>
    
    </Fragment>
  )
}

export default Header