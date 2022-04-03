import React, {useEffect} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import {loadUser} from '../../actions/users'
import Loader from '../../components/layouts/Loader'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children , isAdmin }) => {

    const dispatch=useDispatch();
    const { isAuthenticated =false, loading = true, user, } = useSelector(state => state.auth)
    
    useEffect(()=>{
        if(!user){
            dispatch(loadUser())
        }
    },[isAuthenticated,loading])
   
    if(loading) return <h1><Loader/></h1>

    if(!loading && isAuthenticated){
        if(isAdmin===true && user.role!=="admin"){
            return <Navigate to='/'/>
        }
        return children;
    }else{
        return <Navigate to={'/login'}/>
    } 

}

export default ProtectedRoute