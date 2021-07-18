
import {CART_REMOVE,CART_ADD,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_PAYMENT_METHOD
} from '../constants/cartConstants';

export const addToCartAction = (product)=> async (dispatch,getState) => {
    dispatch({type:CART_ADD, payload:product})

    localStorage.setItem('cartItems',
     JSON.stringify(getState().cart.cartItems))
} 

export const removeFromCartAction = (product)=> async (dispatch,getState) => {
    dispatch({type:CART_REMOVE, payload:product})

    localStorage.setItem('cartItems',
     JSON.stringify(getState().cart.cartItems))
} 

export const saveShippingAddress = (data)=> async (dispatch) => {
    dispatch({type:CART_SAVE_SHIPPING_ADDRESS, payload:data})

    localStorage.setItem('shippingAddress',
     JSON.stringify(data))
} 

export const savePaymentMethod = (data)=> async (dispatch) => {
    dispatch({type:CART_PAYMENT_METHOD, payload:data})

    localStorage.setItem('paymentMethod',
     JSON.stringify(data))
} 