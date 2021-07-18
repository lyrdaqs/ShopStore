import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { userRegisterAction } from '../actions/userActions'

const RegisterPage = ({history,location}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfrim, setPasswordConfrim] = useState('')
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    const userRegister = useSelector(state=>state.userRegister)
    const {userInfo, errors, loading} = userRegister
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const submitHandler = (e) => {
        e.preventDefault()
        if(password != passwordConfrim){
            setMessage("Passwords do not match")
        }else{
            dispatch(userRegisterAction(name,password,email))
            setMessage("")
        } 
    }

    useEffect(() => {
        if(userInfo){
            history.push(redirect)
        }
    },[userInfo, history, redirect])
    
    return ( 
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {errors && <Message variant='danger'>{errors}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        required
                        type='text'
                        placeholder='Enter Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        required
                        type='email'
                        placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='passwordConfrim'>
                    <Form.Label>Password Confrim</Form.Label>
                    <Form.Control
                        required
                        type='password'
                        placeholder='Enter Password Confrim'
                        value={passwordConfrim}
                        onChange={(e) => setPasswordConfrim(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Register
                </Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have a Account? <Link
                        to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                         Login
                        </Link>
                </Col>
            </Row>
        </FormContainer>
        
    );
}
 
export default RegisterPage;

