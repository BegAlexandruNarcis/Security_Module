import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
export default function App() {
    return (
        <div className='page-container'>
            <Navbar />
            <div className="App">

                <div className="card mb-3 text-center">
                    <img src="/img/1.jpg" className="card rounded mx-auto d-block" alt=""  height="200px"  width="400px" />
                    <div className="card-body">
                        <h5 className="card-title">Pieces of information</h5>
                        <p className="card-text">We are a community of three people who want to offer visitors to our site a variety of products consisting of clothing, jewelry and electronics.</p>
                        <p className="card-text">We want our online shop to delight your eyes and be useful for your next purchases.</p>
                    </div>
                </div>
                <div className="card text-center">
                    <div className="card-body">
                        <h5 className="card-title">More</h5>
                        <p className="card-text">This site was born out of our team eager to create a simple store with everything you need for you and your family.</p>
                        <p className="card-text">Together as a team, we have spent many hours and put in a lot of work to bring the most beautiful and necessary products just a few clicks away from you.
                            We want to continue to expand and develop our store for the most satisfying shopping experiences.</p>
                    </div>
                    <img src="/img/2.jpg" className="card rounded mx-auto d-block" alt ="" height="200" width="400" />
                </div>
            </div>
            <Footer />
        </div>
    );
}