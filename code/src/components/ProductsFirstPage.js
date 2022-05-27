import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import styled from 'styled-components'
const GalleryStyles = styled.div`
    .gallery__grid {
        display: grid;
        gap: 2rem;
        grid-auto-flow: dense;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
        justify-content: center;
    }
`

function ProductsFirstPage(props) {
    const [data, setData] = useState([]);
    const [filter, setFilter] = useState([]);
    const {
        id,
        title,
        description,
        price,
        image,
        category,
        rating,
    } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
    }, [title, description, price, image, category, rating]);

    const getData = () => {
        const params = new FormData();

        params.append("id", id);
        params.append("title", title);
        params.append("description", description);
        params.append("price", price);
        params.append("image", image);
        params.append("category", category);
        params.append("rating", rating);

        axios.get('https://fakestoreapi.com/products', params)
            .then(res => {

                setData(res.data);
                setFilter(res.data);
                setLoading(false);

            })
    }
    console.log(data)

    const filterProducts = (category) => {
        const filtered = data.filter(product => {
            return product.category === category;
        });
        setFilter(filtered);
    }

    function ShowButtons() {
        return (

            <div className="mb-4 buttons d-flex justify-content-center" >
                <button className="btn btn-outline-dark me-2" onClick={() => setFilter(data)} >ALL</button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("men's clothing")}>Men's Clothing</button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("women's clothing")}>Women's Clothing</button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("jewelery")}>Jewelery</button>
                <button className="btn btn-outline-dark me-2" onClick={() => filterProducts("electronics")}>Electronics</button>
            </div>
        );
    }

    const ShowProducts = () => {
        return (
            <div className="row">
                {filter.map((product) => {
                    return (
                        <div className="col-md-3 mb-4 " key={product.id} >
                            <div className="card h-100 text-center p-4" >
                                <img src={product.image} alt="" className="card-img-top" height="300px" />
                                <div className="card-body">
                                    <h5 className="card-title mb-0">{product.title.substring(0, 11)}</h5>

                                    <p className="card-text lead fw-bold">${product.price}</p>
                                    <NavLink to={`/products/${product.id}`} className="btn btn-outline-dark">Buy Product</NavLink>
                                </div>
                            </div>
                        </div>
                    );
                }
                )}
            </div>
        );
    }
    const Loading = () => {
        let rows = []
        for (let index = 0; index < 8; index++) {
            rows.push(
                <div className="col-md-6" style={{ lineHeight: 2 }}>
                    <Skeleton height={300} width={300} />
                    <div className=''>
                        <Skeleton height={30} width={300} />
                        <Skeleton height={30} width={300} />
                        <Skeleton height={35} width={300} />
                    </div>


                </div>
            )
        }
        return (
            <SkeletonTheme color='#F5F5F5' highlightColor='#ffffff'>
                <GalleryStyles className='gallery__grid'>
                    <div className='gallery__grid'>
                        {rows}
                    </div>
                </GalleryStyles>
            </SkeletonTheme>
        )

    }

    return (

        <div>
            <div className="container my-2 py-3">
                <div className="row">
                    <div className="col-12  ">
                        <h1 className="display-6 fw-bolder text-center">
                            Latest Products</h1>
                        <hr />
                        <ShowButtons />
                        {loading ? <Loading /> : <ShowProducts />}
                    </div>

                </div>

            </div>
        </div>

    );
}

export default ProductsFirstPage;