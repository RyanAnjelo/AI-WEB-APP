import React , {Fragment, useState,useEffect} from 'react'
import { useDispatch , useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import { Link, useLocation } from 'react-router-dom'
import {userLogin, clearErrors} from '../../actions/users'
import { useNavigate ,useParams} from 'react-router-dom'

const Login = () => {
    const dispatch= useDispatch();
    const alert=useAlert();
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    let navigate=useNavigate();
  
    let location =useLocation();
    const {isAuthenticated,error,loading}=useSelector(state =>state.auth);
    const redirect=location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
        if(isAuthenticated){
            navigate(redirect)
            
        }
    
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        
    
    },[dispatch,alert,isAuthenticated,error,navigate])
    
    const loginHandler=(ev)=>{
        ev.preventDefault();
        dispatch(userLogin(email,password));
        
    }
    
    
      return (
       <Fragment>
           {loading ?<Loader></Loader> :(
               <Fragment>
                    <MetaData title={'Login'} />
                   <div className="row wrapper"> 
            <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={loginHandler}>
                <h1 className="mb-3">Login</h1>
                <div className="form-group">
                  <label htmlFor="email_field">Email</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                  />
                </div>
      
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(p)=>setPassword(p.target.value)}
                  />
                </div>
    
                <Link to="/password/forgot" className="float-right mb-4">Forgot Password?</Link>
      
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-block py-3"
                >
                  LOGIN
                </button>
    
                <Link to="/register" className="float-right mt-3">New User?</Link>
              </form>
              </div>
        </div>
               </Fragment>
           )}
       </Fragment>
      )}

export default Login