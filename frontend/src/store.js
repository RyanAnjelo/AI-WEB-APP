import { createStore , combineReducers , applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension'
import {productsReducer,productDetailsReducer} from './reducers/productReducers'
import { authUser, userReducer,forgotPasswordReducer } from "./reducers/userAuth"
import { cartReducer } from "./reducers/cartReducers";
import {orderReducer} from './reducers/orders'
import {newOrderReducer,myOrdersReducer,orderDetailsReducer,allOrdersReducer} from './reducers/orders'
import { newReviewReducer,productReducer} from './reducers/productReducers';
import { allUsersReducer } from "./reducers/userAuth";


const reducer = combineReducers({
    products:productsReducer,
    product: productReducer,
    productDetails:productDetailsReducer,
    auth:authUser,
    user:userReducer,
    forgotPassword:forgotPasswordReducer ,
    cart:cartReducer,
    order: orderReducer,
    newOrder: newOrderReducer,
    myOrders:myOrdersReducer,
    orderDetails:orderDetailsReducer,
    newReview:newReviewReducer,
    allUsers: allUsersReducer,
    allOrders: allOrdersReducer
})

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {}
    }
}


const middlware = [thunk];
const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middlware)))

export default store;