import { Row, Col,Image, ListGroup, Button, Form } from 'react-bootstrap';
import Rating from '../components/Rating.js';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {useSelector,useDispatch} from 'react-redux';
import { productDetailsAction,createReviewAction } from '../actions/productActions';
import { addToCartAction } from '../actions/cartActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import {PRODUCT_REVIEW_RESET} from '../constants/productConstants';
import axios from 'axios'

const ProductPage = ({match, history}) => {
    
    const dispatch = useDispatch()
    const productDetails = useSelector(state=>state.productDetails)
    const {errors, product, loading} = productDetails
    
    const [qty,setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const productCreateReview = useSelector(state => state.productCreateReview)
    const {
        loading: loadingProductReview,
        errors: errorProductReview,
        success: successProductReview,
    } = productCreateReview

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {

        if (successProductReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_REVIEW_RESET })
            dispatch(productDetailsAction(match.params.id))
        }

        if(!product.name || product._id !== Number(match.params.id)){
            dispatch(productDetailsAction(match.params.id))
            if(userInfo){
                viewProduct(userInfo['token'],match.params.id)
            }
        }

    },[dispatch,match,product,successProductReview]);

    const addToCartHandeler = ()=>{
        history.push(`/cart/${match.params.id}?qty=${qty}`)

        dispatch(addToCartAction({
            product:product._id,
            name:product.name,
            image:product.image,
            price:product.price,
            countInStock:product.countInStock,
            qty
        }))
    }

    const viewProduct = async (token,id) => {
        const config = {
            headers:{
                'Content-type': 'application/json',
                Authorization:`Bearer ${token}`
            }
        }
        await axios.post(
            `/api/products/${id}/view/`,
            {},
            config
        )
    }

    const submitHandler = (e)=>{
        e.preventDefault()
        dispatch(createReviewAction(match.params.id,
        {rating,comment}))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go Back</Link>
            {loading ? <Loader/>
                : errors ? <Message variant="danger">{errors}</Message>
                :(
                    <div>
                    <Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid />
                        </Col>

                        <Col md={3}>
                            <ListGroup variant="flush">
                                
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                                </ListGroup.Item>

                                <ListGroup.Item>
                                        Price: ${product.price}
                                </ListGroup.Item>

                                <ListGroup.Item>
                                        Description: {product.description}
                                </ListGroup.Item>
                            
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                            <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                </ListGroup>

                                {product.countInStock > 0 &&
                                     <ListGroup.Item>
                                         <Row>
                                         <Col>Qty:</Col>
                                            <Col xs='auto' className="my-1">
                                              <Form.Control
                                                as="select"
                                                value = {qty}
                                                onChange = {(e) => setQty(e.target.value)}
                                              > 

                                                {[...Array(product.countInStock).keys()].map(v=>(
                                                    <option key={v+1} value={v+1}>{v+1}</option>
                                                ))
                                                }

                                              </Form.Control>
                                            </Col>
                                         </Row>
                                     </ListGroup.Item>
                                 
                                }

                                <Button 
                                className='btn-block my-2'
                                onClick={addToCartHandeler}
                                disabled={product.countInStock == 0}
                                type='button'
                                >Add To Cart</Button>
                        </Col>
                    </Row>
                    
                    <Row>
                    <Col md={6}>
                        <h4>Reviews</h4>
                        {product.reviews.length === 0 && <Message variant='info'>No Reviews</Message>}

                        <ListGroup variant='flush'>
                            {product.reviews.map((review) => (
                                <ListGroup.Item key={review._id}>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} color='#f8e825' />
                                    <p>{review.createdAt.substring(0, 10)}</p>
                                    <p>{review.comment}</p>
                                </ListGroup.Item>
                            ))}

                            <ListGroup.Item>
                                <h4>Write a review</h4>

                                {loadingProductReview && <Loader />}
                                {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group controlId='rating'>
                                            <Form.Label>Rating</Form.Label>
                                            <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                            >
                                                <option value=''>Select...</option>
                                                <option value='1'>1 - Poor</option>
                                                <option value='2'>2 - Fair</option>
                                                <option value='3'>3 - Good</option>
                                                <option value='4'>4 - Very Good</option>
                                                <option value='5'>5 - Excellent</option>
                                            </Form.Control>
                                        </Form.Group>

                                        <Form.Group controlId='comment'>
                                            <Form.Label>Review</Form.Label>
                                            <Form.Control
                                                as='textarea'
                                                row='5'
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            ></Form.Control>
                                        </Form.Group>

                                        <Button
                                            disabled={loadingProductReview}
                                            type='submit'
                                            variant='primary'
                                        >
                                            Submit
                                        </Button>

                                    </Form>
                                ) : (
                                        <Message variant='info'>Please <Link to='/login'>login</Link> to write a review</Message>
                                    )}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                    </Row>
                    
                    </div>

                )
            }
        </div> 
    );
}
 
export default ProductPage;