import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getOrderDetails, payOrder, deliverOrder } from '../actions/orderActions'
import axios from 'axios'
import { PayPalButton, PaypalButton } from 'react-paypal-button-v2'
import {ORDER_PAY_RESET, ORDER_DELIVER_RESET} from '../constants/orderConstants'

const OrderScreen = ({ match, history }) => {
    const dispatch = useDispatch()
    const orderId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)

    const takeOrderDetails = useSelector(state => state.orderDetails)
    const { orderDetails, loading, error } = takeOrderDetails

    const OrderPay = useSelector(state => state.orderPay)
    const { loading:loadingPay, success:successPay } = OrderPay

    const OrderDeliver = useSelector(state => state.orderDeliver)
    const { loading:loadingDeliver, success:successDeliver } = OrderDeliver

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    const addDecimals = ( num ) => {
        return (Math.round(num*100)/100).toFixed(2)
    }

    if(!loading){
    orderDetails.itemsPrice = addDecimals(orderDetails.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0 ))
    }

    useEffect(() => {

        if(!userInfo){
            history.push('/login')
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async= true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!orderDetails || successPay || successDeliver) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch({ type: ORDER_DELIVER_RESET })
            dispatch(getOrderDetails(orderId))
        } else if(!orderDetails.isPaid) {
            if(!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, orderDetails, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(orderDetails))
    }

    return ( loading? <Loader /> : error ? <Message variant='danger'>{error}</Message>:

    <>
        <Row>
            <Col md={8}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong> {orderDetails.user.name}</p>
                        <p><strong>Email: </strong><a href={`mailto:${orderDetails.user.email}`}>{orderDetails.user.email}</a></p>
                        <p>
                            <strong>Address:</strong>
                            {orderDetails.shippingAddress.address}, {orderDetails.shippingAddress.city}{' '}
                            {orderDetails.shippingAddress.postalCode},{' '}
                            {orderDetails.shippingAddress.country}
                        </p>
                        {orderDetails.isDelivered ? (
                            <Message variant='success'>Delivered on {orderDetails.deliveredAt}</Message>
                        ) : (
                            <Message variant='danger'>Not delivered</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method:</strong>
                            {orderDetails.paymentMethod}
                        </p>
                        {orderDetails.isPaid ? (
                            <Message variant='success'>Paid on {orderDetails.paidAt}</Message>
                        ) : (
                            <Message variant='danger'>Not Paid</Message>
                        )}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        <p>
                            <strong>Method:</strong>
                            {orderDetails.orderItems.length === 0? <Message>Your orderDetails is Empty!</Message>:(
                                <ListGroup variant='flush'>
                                    {orderDetails.orderItems.map((item,index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </p>
                    </ListGroup.Item>

                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${orderDetails.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${orderDetails.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${orderDetails.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${orderDetails.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!orderDetails.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {!sdkReady ? (
                                    <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={orderDetails.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                            </ListGroup.Item>
                        )}
                        {loadingDeliver && <Loader />}
                        {userInfo && userInfo.isAdmin && orderDetails.isPaid && !orderDetails.isDelivered && 
                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    className='btn btn-block'
                                    onClick={deliverHandler}
                                >
                                    Mark as Delivered
                                </Button>
                            </ListGroup.Item>
                        }
                    </ListGroup>
                </Card>
            </Col>
        </Row>      
        
    </>
  )
}

export default OrderScreen