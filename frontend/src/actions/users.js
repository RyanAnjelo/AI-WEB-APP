import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_REQUEST,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL

} from '../constants/user.js' 

/*The method that will be used for login */
export const userLogin =(email,password)=>async(dispatch)=>{
    try{
        dispatch({type:LOGIN_REQUEST})
        const config ={
            headers:{
                'Content-Type':'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/login',{email,password},config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:data.user
        })


    }catch(error){
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
}


/*The method that will be used for registering users */
export const userRegister = (userData) => async (dispatch) => {
    try {

        dispatch({ type: SIGNUP_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post('/api/v1/register', userData, config)

        dispatch({
            type:SIGNUP_SUCCESS ,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: error.response.data.message
            
        })
        console.log(error.response)
    }
}

// Load user
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST })

        const { data } = await axios.get('/api/v1/profile')
        console.log(data.logedUser);

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.logedUser,
            
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}