import React from 'react';
import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';




function Navbar() {
  const [data, setData] = useState([]);
  const state = useSelector((state)=> state.handleCart)

  useEffect(() => {
    getUserRole()
  }, []);
  const getUserRole = () => {
    if (localStorage.hasOwnProperty('userEmail')) {
      const obj = {
        email: localStorage.getItem('userEmail'),
      };
      axios.post('http://localhost/project/userRoles.php', obj)
        .then(res => {
          setData(res.data[0].ROLES);
          localStorage.setItem('userRole', res.data[0].ROLES);
        })
        .catch(error => {
          console.log(error.response)
        });

    }
  }
  const handleLogOut = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    localStorage.setItem('userRole','0');
    localStorage.setItem('isLoggedin', "false");
    window.location.reload();
  }



  return (
    <div className="fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3" href="/">KeyMart</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mx-auto mb-lg-0">
              <li className="nav-item">
                <div className="btn">
                  <NavLink to="/" className="btn btn-outline-dark">Home</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="btn">
                  <NavLink to="/Products" className="btn btn-outline-dark">Products</NavLink>
                </div>
              </li>
              <li className="nav-item">
                <div className="btn">
                  <NavLink to="/About" className="btn btn-outline-dark">About</NavLink>
                </div>
              </li>



            </ul>



            
              {(() => {
                if (data === "2") {

                  return (
                    <div className="btn">
                      <NavLink to="/MainTable" className="btn btn-outline-dark " >Users Permission</NavLink>
                    </div>
                  )
                }

              })()}


              {(() => {
                if (data === "2" || data === "3") {

                  return (
                    <div className="btn">
                      <NavLink to="/Accountant" className="btn btn-outline-dark " >Accountant </NavLink>
                    </div>
                  )

                }

              })()}


              {(() => {
                if (data === "4" || data === "2") {

                  return (
                    <div className="btn">
                      <NavLink to="/Orders" className="btn btn-outline-dark " >Orders</NavLink>
                    </div>
                  )

                }

              })()}




              <div className="btn">
                <NavLink to="/Cart" className="btn btn-outline-dark "  >
                  <i className="fa fa-shopping-cart me-1 "></i>Cart({state.length})</NavLink>
              </div>


              {(() => {
                if (localStorage.getItem('isLoggedin') !== null && localStorage.getItem('isLoggedin') === "true") {
                  return (

                    <div className="btn">
                      <NavLink to="/UserProfile" className="btn btn-outline-dark " >
                        <i className="fa fa-user "></i>My Account
                      </NavLink>

                    </div>
                  );
                } else {
                  return (
                    <div className="btn">

                      <NavLink to="/Login" className="btn btn-outline-dark " >
                        <i className="fa fa-user "></i>My Account
                      </NavLink>

                    </div>
                  );
                }
              })()}

              {(() => {
                if (localStorage.getItem('isLoggedin') === null || localStorage.getItem('isLoggedin') === "false") {
                  return (
                    <div className="btn">
                      <NavLink to="/Login" className="btn btn-outline-dark " >
                        <i className="fa fa-arrow-right-to-bracket "></i>Log in
                      </NavLink>
                    </div>
                  );
                }
              })()}

              {(() => {
                if (localStorage.getItem('isLoggedin') !== null && localStorage.getItem('isLoggedin') === "true") {
                  return (
                    <div className="btn" onClick={() => handleLogOut()}>
                      <NavLink to="/" className="btn btn-outline-dark "   >
                        <i className="fa fa-arrow-right-to-bracket " ></i>Log Out
                      </NavLink>
                    </div>
                  );
                }
              })()}

           



          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar;