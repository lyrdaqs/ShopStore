import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { userDetailsAction, userUpdateAction } from '../actions/userActions'
import { USER_UPDATE_ADMIN_RESET } from '../constants/userConstants'

const UserEditPage = ({match, history}) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector(state => state.userDetails)
    const { errors, loading, user } = userDetails

    const userUpdate = useSelector(state => state.userUpdate)
    const { errors:errorUpdate, loading:loadingUpdate, success} = userUpdate

    useEffect(() => {
        if(success){
            dispatch({type:USER_UPDATE_ADMIN_RESET})
            dispatch(userDetailsAction(userId))
            history.push('/admin/users')
        }
        if (userInfo && userInfo.isAdmin ) {
            if (user._id !== Number(userId)) {
                dispatch(userDetailsAction(userId))
            }else{
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            } 
        } else {
            history.push('/login')
        }

    }, [dispatch, history, userInfo, user, success])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(userUpdateAction({
            _id:user._id ,name ,email, isAdmin
        }))
    }
    
    return ( 
        <div>
            <Link to='/admin/users'>
                Go Back
            </Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

                {loading ? <Loader /> : errors ? <Message variant='danger'>{errors}</Message>
                    : (
                        <Form onSubmit={submitHandler}>

                            <Form.Group controlId='name'>
                                <Form.Label>Name</Form.Label>
                                <Form.Control

                                    type='name'
                                    placeholder='Enter name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='email'>
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder='Enter Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group controlId='isadmin'>
                                <Form.Check
                                    type='checkbox'
                                    label='Is Admin'
                                    checked={isAdmin}
                                    onChange={(e) => setIsAdmin(e.target.checked)}
                                >
                                </Form.Check>
                            </Form.Group>

                            <Button type='submit' variant='primary'>
                                Update
                            </Button>

                        </Form>
                    )}

            </FormContainer >
        </div>
    );
}
 
export default UserEditPage;
