import React , {Fragment, useState,useEffect} from 'react'
import { useDispatch , useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import MetaData from '../layouts/MetaData'
import Loader from '../layouts/Loader'
import { Link, useLocation } from 'react-router-dom'
import {userLogin, clearErrors} from '../../actions/users'
import { useNavigate } from 'react-router-dom'


const Login = () => {
  
    const dispatch= useDispatch();
    const alert=useAlert();
    
    //const [email,setEmail]=useState('');
    //const [password,setPassword]=useState('');
    
    const initialValues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    let navigate=useNavigate();
  
    let location =useLocation();
    const {isAuthenticated,error,loading,failed,user}=useSelector(state =>state.auth);
    const redirect=location.search ? location.search.split('=')[1] : '/'

    useEffect(()=>{
      if (failed) {
          alert.error('Invalid Credtionals !!')
      }
      if (isAuthenticated) {
       
        if (user.role === 'admin') {
        navigate('/dashboard')
      }
      else if (user.role === 'user') {
        navigate('/');
      }
       
      }
     
      
      else if(error){
          alert.error(error);
          dispatch(clearErrors());
        }
      
    
    }, [dispatch, alert, isAuthenticated, error, navigate,failed,redirect,user])
  
    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const loginHandler = (ev) => {
      ev.preventDefault()
      setFormErrors(validate(formValues));
      setIsSubmit(true);
      dispatch(userLogin(formValues.email,formValues.password));
        
  }  
  
  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, isSubmit, formValues]);
  
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 20) {
      errors.password = "Password cannot exceed more than 20 characters";
    }
    return errors;
  };

      return (
        <Fragment>
       
          {loading ? <Loader></Loader> : (
            
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
                    name='email'    
                    value={formValues.email}
                    onChange={handleChange}
                      />
                <p  className='error'>{formErrors.email}</p>
                </div>
           
                <div className="form-group">
                  <label htmlFor="password_field">Password</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={formValues.password}
                    name='password'    
                    onChange={handleChange}
                      />
                       <p className='error'>{formErrors.password}</p>
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