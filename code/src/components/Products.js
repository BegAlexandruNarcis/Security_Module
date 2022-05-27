import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ProductsFirstPage from './ProductsFirstPage';

function Products(props) {
    
    return (
        <div className='page-container'>
            <Navbar />
            <ProductsFirstPage />
            <Footer />
        </div>
    );
}

export default Products;