import React, { useState, useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { 
    productListAction, 
    productDeleteAction,
    productCreateAction
} from '../actions/productActions'
import Paginate from '../components/Paginate';

import {PRODUCT_CREATE_RESET} from '../constants/productConstants';

const ProductListPage = ({history}) => {

    const keyword = history.location.search

    const dispatch = useDispatch()
    const productList = useSelector(state=>state.productList)
    const {errors, products, loading, page, pages} = productList

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productDelete = useSelector(state => state.productDelete)
    const { errors: errorDelete } = productDelete

    const productCreate = useSelector(state => state.productCreate)
    const { errors: errorCreate, created } = productCreate
    
    useEffect(() => {
        if (userInfo && userInfo.isAdmin ) {
            dispatch(productListAction(keyword))
        } else {
            history.push('/login')
        }
    },[dispatch, userInfo, keyword]);

    useEffect(() => {
        if (created) {
            dispatch({type:PRODUCT_CREATE_RESET})
            history.push(`/admin/product/${created._id}/edit`)
        } 
    },[history, created]);

    const createProductHandler =  async () => {
        dispatch(productCreateAction())
    }

    const deleteHandler = async (id) => {
        dispatch(productDeleteAction(id))
    }
    return (  
        <div>
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>

                <Col className='text-right'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <i className='fas fa-plus'></i> Create Product
                    </Button>
                </Col>
            </Row>

            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            
            {loading
                ? (<Loader />)
                : errors
                    ? (<Message variant='danger'>{errors}</Message>)
                    : (
                        <div>
                            <Table striped bordered hover responsive className='table-sm'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>NAME</th>
                                        <th>PRICE</th>
                                        <th>CATEGORY</th>
                                        <th>BRAND</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map(product => (
                                        <tr key={product._id}>
                                            <td>{product._id}</td>
                                            <td>{product.name}</td>
                                            <td>${product.price}</td>
                                            <td>{product.category}</td>
                                            <td>{product.brand}</td>

                                            <td>
                                                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                                    <Button variant='light' className='btn-sm'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>

                                                <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(product._id)}>
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <Paginate page={page} pages={pages} keyword={keyword} isAdmin={true}/>
                            
                        </div>
                )}
        </div>
    );
}
 
export default ProductListPage;