import React, { useState } from "react";
import india from "../../images/india.png";
import "../../styles/Login.css";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../../components/Navbar";
import { Link } from "react-router-dom";

const Citizen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  return (
    <>
      <ul className="ul">
        <Link to="/" className="li active"><span className="a">IndiaChain</span></Link>
        <Link to="/request" className="li"><span className="a">Requests</span></Link>
        <Link to="/view" className="li"><span className="a">View your chain</span></Link>
        <Link to="/job" className="li"><span className="a">Job</span></Link>
      </ul>
      <div className="single_view">
        <h2 className="heading">
          Indian Chain
        </h2>
        <h1 className="welcome_message">Welcome <b>{user.user}</b> to your professional community</h1>
        <p className="caption">A single place for all your documents and managing candidates</p>
        <img className="india_img" src={india} alt="India" />
      </div>
      <div className="double_view">
        <div className="left_view">
          <h2 className="heading">
            Indian Chain
          </h2>
          <h1 className="welcome_message">Welcome <b>{user.user}</b>  to your professional community</h1>
        </div>
        <div>
          <img className="india_img" src={india} alt="India" />
        </div>
      </div>
      <div className="footer">
        <div className="line1">
          <div className="articles">Read new updates</div>
          <div className="articles">Privacy Policy</div>
          <div className="articles">User Policy</div>
          <div className="articles">About Us</div>
          <div className="articles">Careers</div>
          <div className="articles">Services</div>
        </div>
        <div className="line2">
          <div className="arts">Read new updates</div>
          <div className="arts">Privacy Policy</div>
          <div className="arts">User Policy</div>
        </div>
        <div className="line3">
          <div className="arts">About Us</div>
          <div className="arts">Careers</div>
          <div className="arts">Services</div>
        </div>
        <div className="contact"><h4 className="contact_header">Contact us on</h4></div>
        <div className="contact"><p>Phone: +91 1234567890</p></div>
        <div className="contact"><p>Twitter</p></div>
        <div className="contact"><p>Email</p></div>
      </div>
    </>
  )
}

export default Citizen;