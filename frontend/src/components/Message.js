import React from 'react';
import {Alert} from 'react-bootstrap';

const Meesage = ({variant,children}) => {
    return ( 
       <Alert variant={variant}>
           {children}
       </Alert>
    );
}
 
export default Meesage;