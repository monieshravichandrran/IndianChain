import React, { useState, useContext } from "react";
import { TextField } from "@mui/material";
import india from "../images/india.png";
import "../styles/Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RouteContext } from "../App";
import Modal from 'react-modal';

const Login = () => {

  const [email_phno, setEmail_phno] = useState();
  const [password, setPassword] = useState();
  const [showFile, setShowFile] = useState(false);
  const [fileLink, setFilelink] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const address = useSelector((state) => state.accounts);
  const Route = useContext(RouteContext);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width:"70%",
      height: "70%",
      transform: 'translate(-50%, -50%)',
    },
  };

  const submitHandler = () => {
    const payload = {
      email: email_phno,
      password: password,
      address: address ? address[0] : null
    };
    console.log(payload);
    axios.post(process.env.REACT_APP_BACKEND_API_BASE_URL + '/login', payload).then((data, err) => {
      if (err) {
        console.log("failed to post");
        return;
      }
      console.log(data);
      if (data.data.type == -1) {
        return;
      }
      Route.setType(data.data.type);
      dispatch({ type: "SIGN_IN", payload: { user: email_phno, type: data.data.type, account: address } });
    });
  }


  return (
    <>
      <div className="single_view">
        <h2 className="heading">
          Indian Chain
        </h2>
        <h1 className="welcome_message">Welcome to your professional community</h1>
        <p className="caption">A single place for all your documents and managing citizens</p>
        <div className="form_box">
          <div className="email_wrapper">
            <TextField onChange={(e) => {
              setEmail_phno(e.target.value)
            }} value={email_phno} className="email" id="outlined-basic" label="Email / Phone number" variant="outlined" />
          </div>
          <div className="password_wrapper">
            <TextField onChange={(e) => {
              setPassword(e.target.value);
            }} email={password} type="password" className="password" id="outlined-basic" label="Password" variant="outlined" />
          </div>
          <p className="forgot_password">Forgot Password?</p>
          <button className="sign_in" onClick={submitHandler}>Sign In</button>
        </div>
      </div>
      <div className="double_view">
        <div className="left_view">
          <h2 className="heading">
            Indian Chain
          </h2>
          <h1 className="welcome_message">Welcome to your professional community</h1>
          <p className="caption">A single place for all your documents and managing citizens</p>
          <div className="form_box">
            <div className="email_wrapper">
              <TextField onChange={(e) => {
                setEmail_phno(e.target.value)
              }} value={email_phno} className="email" id="outlined-basic" label="Email / Phone number" variant="outlined" />
            </div>
            <div className="password_wrapper">
              <TextField onChange={(e) => {
                setPassword(e.target.value);
              }} email={password} type="password" className="password" id="outlined-basic" label="Password" variant="outlined" />
            </div>
            <p className="forgot_password">Forgot Password?</p>
            <button className="sign_in" onClick={submitHandler}>Sign In</button>
          </div>
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

export default Login;