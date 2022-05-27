
import React from 'react';
import MainTable from './MainTable'
import Registration from '../pages/Register'
import Login from '../pages/Login'
import FirstPage from '../pages/FirstPage';
import UserProfile from '../pages/UserProfile';
import Products from './Products';
import About from '../pages/About';
import Product from './Product';
import Navbar from './Navbar';
import Accountant from '../pages/Accountant';

import Orders from '../pages/Orders';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CartBuy from '../pages/CartBuy';
import Cart from '../pages/Cart';

function App() {

  return (
    <>


      <Router>

        <Routes>

          <Route path="/Login" element={<Login />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<Product />} />
          <Route path="/" element={<FirstPage />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/MainTable" element={<MainTable />} />
          <Route path="/Register" element={<Registration />} />
          <Route path="/About" element={<About />} />
          <Route path="/Navbar" element={<Navbar />} />
          <Route path="/Accountant" element={<Accountant />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/CartBuy" element={<CartBuy />} />
          <Route path="/Cart" element={<Cart />} />
        

        </Routes>

      </Router>
    </>
  );


}

export default App