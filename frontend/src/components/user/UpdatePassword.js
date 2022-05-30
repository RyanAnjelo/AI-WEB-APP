import React , {Fragment, useState,useEffect} from 'react'
import { useDispatch , useSelector} from 'react-redux'
import {useAlert} from 'react-alert'
import MetaData from '../layouts/MetaData'

import {updatePassword, clearErrors} from '../../actions/users'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PASSWORD_RESET } from '../../constants/user'
 

const UpdatePassword = () => {
    
    
   // const [oldPassword, setOldPassword] = useState('')
    //const [password, setPassword] = useState('')

    const initialValues = { email: "", password: "",name:""};
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
   
    const alert = useAlert();
    const dispatch = useDispatch();
    let navigate=useNavigate();
    const { error, isUpdated, loading } = useSelector(state => state.user)

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success('Password updated successfully')

            navigate('/profile')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, navigate, isUpdated,formErrors,formValues,isSubmit])

    const submitHandler = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const formData = new FormData();
        formData.set('oldPassword', formValues.oldPassword);
        formData.set('password', formValues.password);

        dispatch(updatePassword(formData))
    }

     //method to handle validation of user
    const validate = (values) => {
    const errors = {};
    if (!values.password || !values.oldPassword) {
      errors.password = "Password is required";
    } else if (values.password.length < 4 || values.oldPassword.length < 4 ) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 20 || values.oldPassword.length < 4 ) {
      errors.password = "Password cannot exceed more than 20 characters";
    }
    return errors;
  };

 const onChange = e => {

    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
        
  }

    return (
        <Fragment>
            <MetaData title={'Change Password'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mt-2 mb-5">Update Password</h1>
                        <div className="form-group">
                            <label htmlFor="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                name='oldPassword'
                                value={formValues.oldPassword}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                name='password'
                                value={formValues.password}
                                onChange={onChange}
                            />
                        </div>
                        <button type="submit" className="btn update-btn btn-block mt-4 mb-3" disabled={loading ? true : false} >Update Password</button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default UpdatePassword