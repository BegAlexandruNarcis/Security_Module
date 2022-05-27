import React from "react";
import ProductsFirstPage from "./ProductsFirstPage";


const Home = () => {
    return (
        <>
            <div className="herp">
                <div className="card bg-dark text-white" >
                    <img className="card-img" src="img/bg.jpg" alt="Background" height="300px" />
                    
                </div>

            </div>
            <ProductsFirstPage />
            
        </>
    );
}

export default Home;