import {CART_REMOVE,CART_ADD,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_PAYMENT_METHOD,
    CART_CLEAR
} from '../constants/cartConstants';

const initial = {
    cartItems:[], 
    shippingAddress:{}, 
    paymentMethod:null
}

export const CartReducer = (state=initial,action) => {
    switch(action.type){
         case CART_REMOVE:
            return {
                ...state,
                cartItems:state.cartItems.filter(x => x.product!=action.payload)
            }
         
         case CART_ADD:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)
            if(existItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map(x=> x.product == item.product ? item : x)
                }

            }else{
               return {
                   ...state,
                   cartItems:[...state.cartItems,item]
               }
            }

        case CART_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress:action.payload
            }

        case CART_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod:action.payload
            } 
        
        case CART_CLEAR:
            return {}

         default:
            return state
    }
}