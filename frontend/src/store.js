import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productCreateReviewReducer,
    productTopReducer
} from './reducers/productReducer';

import {CartReducer} from './reducers/cartReducer'
import {
    userLoginReducer, 
    userRegisterReducer,
    updateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userDetailsReducer,
    userUpdateReducer
} from './reducers/userReducer';

import {
    orderCreateReducer, 
    orderDetailsReducer,
    orderPayReducer,
    orderListReducer,
    orderAdminListReducer,
    orderDeliverReducer
} from './reducers/orderReducer'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart:CartReducer,
    productDelete:productDeleteReducer,
    productCreate:productCreateReducer,
    productUpdate:productUpdateReducer,
    productCreateReview:productCreateReviewReducer,
    productTop:productTopReducer,
    
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay:orderPayReducer,
    myorders:orderListReducer,
    orderList:orderAdminListReducer,
    orderDeliver:orderDeliverReducer,
    
    userList:userListReducer,
    userDelete:userDeleteReducer,
    userDetails:userDetailsReducer,
    userUpdate:userUpdateReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    profileUpdate:updateProfileReducer,
})

const getCartItemsFromStorage = localStorage.getItem('cartItems') ?
     JSON.parse(localStorage.getItem('cartItems')) : []

const getUserInfoFromStorage = localStorage.getItem('userInfo') ?
     JSON.parse(localStorage.getItem('userInfo')) : null

const getShippingAddressFromStorage = localStorage.getItem('shippingAddress') ?
     JSON.parse(localStorage.getItem('shippingAddress')) : {}

const getPaymentMethodFromStorage = localStorage.getItem('paymentMethod') ?
     JSON.parse(localStorage.getItem('paymentMethod')) : null

const initial = {
    cart:{
        cartItems:getCartItemsFromStorage,
        shippingAddress:getShippingAddressFromStorage,
        paymentMethod:getPaymentMethodFromStorage
    },
    userLogin:{userInfo:getUserInfoFromStorage}
}

const middleware = [thunk]

const store = createStore(reducer,initial,
   composeWithDevTools(applyMiddleware(...middleware)) 
)

export default store