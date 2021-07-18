import React from 'react';
import {Card} from 'react-bootstrap';
import Rating from './Rating.js';
import { Link } from 'react-router-dom';

const Product = ({product}) => {
    return ( 
       <Card className="my-3 rounded">
           <Link to={`/product/${product._id}`}>
              <Card.Img src={product.image} alt={product.name} />
           </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}> 
                    <Card.Title>
                        {product.name} 
                    </Card.Title>
                </Link>
                
                <Card.Text>
                    <Rating value={product.rating} 
                      text={`${product.numReviews} reviews`}
                      color={'#f8e825'}/>    
                </Card.Text>

                <Card.Text as="h4">
                   ${product.price}
                </Card.Text>
            </Card.Body>
       </Card>
    );
}
 
export default Product;