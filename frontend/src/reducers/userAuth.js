import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    SIGNUP_REQUEST,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS

} from '../constants/user.js'



/*The method will be used for authenticating users*/
export const authUser= (state ={user:{}},action)=>{
    switch(action.type){
        case LOGIN_REQUEST:
        case SIGNUP_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading:true,
                isAuthenticated:false
            }
        case LOAD_USER_SUCCESS:
        case SIGNUP_SUCCESS:
        case LOGIN_SUCCESS:
        
            return{
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            }

        case LOAD_USER_FAIL:
            return {
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload
        }

        case SIGNUP_FAIL:
        case LOGIN_FAIL:
        
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload

            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }

}