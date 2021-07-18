import {
    ORDER_CREATE_FAIL,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_ADMIN_LIST_FAIL,
    ORDER_ADMIN_LIST_SUCCESS,
    ORDER_ADMIN_LIST_REQUEST,
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS

} from '../constants/orderConstants';
import {CART_CLEAR} from '../constants/cartConstants'
import axios from 'axios'

export const orderCreateAction = (order)=> async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_CREATE_REQUEST
        })
        
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const { data } = await axios.post(
            '/api/orders/add/',order,config
        )
        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: CART_CLEAR
        })

        localStorage.removeItem('cartItems')
        
    }catch(error){
        dispatch({type: ORDER_CREATE_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
}


export const orderDetailsAction = (id)=> async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })
        
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const { data } = await axios.get(
            `/api/orders/${id}/`,config
        )
        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })
        
    }catch(error){
        dispatch({type: ORDER_DETAILS_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
}


export const orderPayAction = (id)=> async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        await axios.put(
            `/api/orders/${id}/pay/`,
            {},config
        )
        dispatch({
            type: ORDER_PAY_SUCCESS,
        })
        
    }catch(error){
        dispatch({type: ORDER_PAY_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
}


export const getMyOrdersAction = ()=> async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_LIST_REQUEST
        })
        
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const {data} = await axios.get(
            `/api/orders/myorders/`,
            config
        )
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })
        
    }catch(error){
        dispatch({type: ORDER_LIST_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
}


export const getOrdersAction = ()=> async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_ADMIN_LIST_REQUEST
        })
        
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const {data} = await axios.get(
            '/api/orders/',
            config
        )
        dispatch({
            type: ORDER_ADMIN_LIST_SUCCESS,
            payload: data
        })
        
    }catch(error){
        dispatch({type: ORDER_ADMIN_LIST_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
}


export const orderDeliverAction = (id)=> async (dispatch,getState) => {
    try{
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })
        
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        await axios.put(
            `/api/orders/${id}/delivered/`,
            {},config
        )
        dispatch({
            type: ORDER_DELIVER_SUCCESS,
        })
        
    }catch(error){
        dispatch({type: ORDER_DELIVER_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
}