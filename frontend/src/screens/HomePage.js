
import Product from '../components/Product.js';
import { Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { productListAction } from '../actions/productActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';

const HomePage = ({history}) => {
    const dispatch = useDispatch()
    const productList = useSelector(state=>state.productList)
    const {errors, products, loading, page, pages} = productList
    
    const keyword = history.location.search 

    useEffect(() => {
        dispatch(productListAction(keyword))
    },[dispatch,keyword]);

    return ( 
        <div>
            <ProductCarousel/>
            <h1>Latest Products</h1>
            { loading ? <Loader/>
                : errors ? <Message variant="danger">{errors}</Message>
                    : (
                        <div>
                            <Row>
                                {products.map(product=>{
                                    return ( 
                                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                                <Product product={product} />
                                        </Col> 
                                    )
                                })}
                            </Row>
                            <Paginate page={page} pages={pages} keyword={keyword} />
                        </div>
                    )
            
            }
           
        </div>
     );
}
 
export default HomePage;