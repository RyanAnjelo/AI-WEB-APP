import React , {Fragment, useState,useEffect} from 'react'
import { useDispatch , useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import MetaData from '../layouts/MetaData'

import {userRegister, clearErrors} from '../../actions/users'
import { useNavigate } from 'react-router-dom'


const Register = ( ) => {

  const initialValues = { email: "", password: "",name:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  
  let navigate=useNavigate();
  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/imgs/default_avatar.jpg')

  const alert = useAlert();
  const dispatch = useDispatch();

  const { isAuthenticated, error, loading } = useSelector(state => state.auth);

  useEffect(() => {

      if (isAuthenticated) {
        navigate('/')
      }

      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }

  }, [dispatch, alert, isAuthenticated, error, navigate,formErrors, isSubmit, formValues])

  const submitHandler = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      setIsSubmit(true);
      const formData = new FormData();
      formData.set('name', formValues.name);
      formData.set('email', formValues.email);
      formData.set('password', formValues.password);
      formData.set('avatar', avatar);

      dispatch(userRegister(formData))
  }

    const onChange = e => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
        
        const reader = new FileReader();
      
        if ((e.target.name === 'avatar') ) {
        
          reader.onload = () => {
              if (reader.readyState === 2) {
                  setAvatarPreview(reader.result)
                  setAvatar(reader.result)
              }
          }

          reader.readAsDataURL(e.target.files[0])

        } 
  }


    //method to handle validation of user
    const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.name) {
      errors.name = "Username is required!";
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

          <MetaData title={'Register User'} />

          <div className="row wrapper">
              <div className="col-10 col-lg-5">
                  <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                      <h1 className="mb-3">Register</h1>

                      <div className="form-group">
                          <label htmlFor="email_field">Name</label>
                          <input
                              type="name"
                              id="name_field"
                              className="form-control"
                              name='name'
                              value={formValues.name}
                              onChange={onChange}
                          />
                           <p className='error'>{formErrors.name}</p>
                      </div>

                      <div className="form-group">
                          <label htmlFor="email_field">Email</label>
                          <input
                              type="email"
                              id="email_field"
                              className="form-control"
                              name='email'
                              value={formValues.email}
                              onChange={onChange}
                          />
                           <p className='error'>{formErrors.email}</p>
                      </div>

                      <div className="form-group">
                          <label htmlFor="password_field">Password</label>
                          <input
                              type="password"
                              id="password_field"
                              className="form-control"
                              name='password'
                              value={formValues.password}
                              onChange={onChange}
                              
                          />
                           <p className='error'>{formErrors.password}</p>
                      </div>

                      <div className='form-group'>
                          <label htmlFor='avatar_upload'>Avatar</label>
                          <div className='d-flex align-items-center'>
                              <div>
                                  <figure className='avatar mr-3 item-rtl'>
                                      <img
                                          src={avatarPreview}
                                          className='rounded-circle'
                                          alt='Avatar Preview'
                                      />
                                  </figure>
                              </div>
                              <div className='custom-file'>
                                  <input
                                      type='file'
                                      name='avatar'
                                      className='custom-file-input'
                                      id='customFile'
                                      accept="images/*"
                                      onChange={onChange}
                                  />
                                  <label className='custom-file-label' htmlFor='customFile'>
                                      Choose Avatar
                                  </label>
                              </div>
                          </div>
                      </div>

                      <button
                          id="register_button"
                          type="submit"
                          className="btn btn-block py-3"
                          disabled={loading ? true : false}
                      >
                          REGISTER
                      </button>
                  </form>
              </div>
          </div>

      </Fragment>
  )
}

export default Register