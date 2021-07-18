import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_REVIEW_FAIL,
    PRODUCT_REVIEW_REQUEST,
    PRODUCT_REVIEW_SUCCESS,
    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_SUCCESS
} from '../constants/productConstants';

import axios from 'axios'


export const productListAction = (keyword = '')=> async (dispatch) => {
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})
        const {data} = await axios.get(
            `/api/products/${keyword}`,
        )
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data})

    }catch(error){
        dispatch({type:PRODUCT_LIST_FAIL, 
            payload:error.response && error.response.data.message
            ?error.response.data.detail
            :error.message
        })
    }
}


export const topProductsAction = ()=> async (dispatch) => {
    try{
        dispatch({type:PRODUCT_TOP_REQUEST})
        const {data} = await axios.get(
            '/api/products/top/',
        )
        dispatch({type:PRODUCT_TOP_SUCCESS, payload:data})

    }catch(error){
        dispatch({type:PRODUCT_TOP_FAIL, 
            payload:error.response && error.response.data.message
            ?error.response.data.detail
            :error.message
        })
    }
}


export const productDetailsAction = (id)=> async (dispatch) => {
    try{
        dispatch({type:PRODUCT_DETAILS_REQUEST})
        const {data} = await axios.get(
            `/api/products/${id}/`,
        )
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch(error){
        dispatch({type:PRODUCT_DETAILS_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
} 


export const productDeleteAction = (id)=> async (dispatch,getState) => {
    try{
        dispatch({type:PRODUCT_DELETE_REQUEST})
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        await axios.delete(
            `/api/products/${id}/remove/`,
            config
        )
        dispatch({type:PRODUCT_DELETE_SUCCESS})
        dispatch(productListAction())

    }catch(error){
        dispatch({type:PRODUCT_DELETE_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
} 


export const productCreateAction = ()=> async (dispatch,getState) => {
    try{
        dispatch({type:PRODUCT_CREATE_REQUEST})
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const {data} = await axios.post(
            `/api/products/create/`,
            {},
            config
        )
        dispatch({type:PRODUCT_CREATE_SUCCESS, payload:data})

    }catch(error){
        dispatch({type:PRODUCT_CREATE_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
} 


export const productUpdateAction = (product)=> async (dispatch,getState) => {
    try{
        dispatch({type:PRODUCT_UPDATE_REQUEST})
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        const {data} = await axios.post(
            `/api/products/${product._id}/edit/`,
            product,
            config
        )
        dispatch({
            type:PRODUCT_UPDATE_SUCCESS,
            payload:data
        })
        dispatch({type:PRODUCT_DETAILS_SUCCESS, payload:data})

    }catch(error){
        dispatch({type:PRODUCT_UPDATE_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
} 


export const createReviewAction = (pi, review)=> async (dispatch,getState) => {
    try{
        dispatch({type:PRODUCT_REVIEW_REQUEST})
        const token = getState().userLogin.userInfo['token']
        
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        await axios.post(
            `/api/products/${pi}/review/`,
            review,
            config
        )
        dispatch({
            type:PRODUCT_REVIEW_SUCCESS,
        })

    }catch(error){
        dispatch({type:PRODUCT_REVIEW_FAIL, 
            payload:error.response && error.response.data.detail
            ?error.response.data.detail
            :error.message
        })
    }
} 