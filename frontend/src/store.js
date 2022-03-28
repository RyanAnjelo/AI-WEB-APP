import { createStore , combineReducers , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import {productsReducer,productDetailsReducer} from './reducers/productReducers'
import { authUser, userReducer,forgotPasswordReducer } from "./reducers/userAuth"
const reducer = combineReducers({
    products:productsReducer,
    productDetails:productDetailsReducer,
    auth:authUser,
    user:userReducer,
    forgotPassword:forgotPasswordReducer
})



const middlware = [thunk];
const store = createStore(reducer, composeWithDevTools(applyMiddleware(...middlware)))

export default store;