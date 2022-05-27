import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { delCart,addCart } from '../redux/action';
import { NavLink } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ChakraProvider } from '@chakra-ui/react';

import { Container, Box } from '@chakra-ui/react'

const Cart = () => {
  const state = useSelector((state) => state.handleCart);
  const dispatch = useDispatch()

  const handleClose = (item) => {
    dispatch(delCart(item))
  }
  const handleButtonMinus = (cartItem) => {
    dispatch(delCart(cartItem))
  }
  const handleButtonPlus = (cartItem) => {
    dispatch(addCart(cartItem));
  }
  let total = 0;

  const cartItems = (cartItem) => {
    total = total + (cartItem.qty * cartItem.price)
    console.log(total)
    localStorage.setItem('Total', total)

    return (


      <ChakraProvider  >
        <Container display={{ base: 'block', md: 'flex', }} maxW="container.xl" >

          <Box
            as="main"
            flex={3}
            d="flex"
            flexDir="column"
            justifyContent="space-between"
            pt={5}
            px={3}
            my={5}
            mt={5}
            bg="white"
            rounded="md"
            borderWidth={1}
            borderColor="black"
          >


            
              <div className="container py-4 " key={cartItem.id}>
                <button onClick={() => handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                <div className="row justify-content-center">
                  <div className="col-md-4">
                    <img src={cartItem.image} alt={cartItem.title} height="200px" width="180px" />
                  </div>
                  <div className="col-md-5 fw-bold">
                    <h2>{cartItem.title}</h2>
                    <p className="lead fw-bold">
                      {cartItem.qty} x ${cartItem.price} = $
                      {cartItem.qty * cartItem.price}
                    </p>
                    <button className='btn btn-outline-dark me-4'
                      onClick={() => handleButtonMinus(cartItem)}>
                      <i className="fa fa-minus"></i>
                    </button>

                    <button className='btn btn-outline-dark me-4'
                      onClick={() => handleButtonPlus(cartItem)}>
                      <i className="fa fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>
            

          </Box>
        </Container>
      </ChakraProvider>


    );
  }
  const emptyCart = () => {
    return (
      <div className="px-4 my-5 bg-light rounded-3 py-4">
        <div className="container py-4">
          <div className="row">
            <h3>Your cart is empty</h3>
          </div>
        </div>
      </div>

    );
  }
  const button = () => {
    return (
      <div className="container">
        <div className="row">
          <NavLink to="/CartBuy" className="btn btn-outline-dark">Go to checkout</NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <Navbar />
      {state.length === 0 && emptyCart()}
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && button()}
      <Footer />
    </div>

  );
}

export default Cart