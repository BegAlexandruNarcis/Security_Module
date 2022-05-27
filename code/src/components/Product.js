import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {addCart} from '../redux/action';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const Product = () => {
    
    const { id } = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();
    const addProduct = (product) => {
        dispatch(addCart(product));
        alert('Product Added to Cart');

    }
    useEffect(() => {
        const getProduct = () => {
            setLoading(true);
            axios.get(`https://fakestoreapi.com/products/${id}`)
                .then(res => {

                    setProduct(res.data);
                    setLoading(false);
                })
        }

        getProduct();
    }, []);

    const ShowProducts = () => {
        return (
            <>
               
                <div className="col-md-6">
                    <img src={product.image} alt={product.title} height="400px" width="400px" />
                </div>
                <div className="col-md-6">
                    <h4 className="text-uppercase text-black-50">
                        {product.category}
                    </h4>
                    <h1 className='display-5'>
                        {product.title}
                    </h1>
                    <p className="lead fw-bolder">
                        Rating {product.rating && product.rating.rate}
                        <i className="fa fa-star"></i>
                    </p>
                    <h3 className="display-6 fw-bold my-4">
                        ${product.price}
                    </h3>
                    <p className='lead'>
                        {product.description}
                    </p>
                    <button className="btn btn-outline-dark ms-2 py-2" onClick={() => addProduct(product)}>
                        Add to Cart
                    </button>
                    <NavLink to="/cart" className="btn btn-outline-dark ms-2 py-2">
                        Go to Cart
                    </NavLink>
                </div>
            </>
        )
    }
    const Loading = () => {
        return (
            <>

                <div className="col-md-6">
                    <Skeleton height={400} width={400} />
                </div>
                <div className="col-md-6" style={{lineHeight:2}}>
                   <Skeleton height={50} width={300} />
                   <Skeleton height={75} />
                   <Skeleton height={25} width={150}/>
                   <Skeleton height={50} />
                   <Skeleton height={150} />
                   <Skeleton height={50} width={200}/>

                </div>
            </>
        )
    }


    return (
        <div className='page-container' >
            <Navbar />
            <div>
                <div className="container py-5">
                    <div className="row py-5">
                      {loading? <Loading/>: <ShowProducts /> }  
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
export default Product;