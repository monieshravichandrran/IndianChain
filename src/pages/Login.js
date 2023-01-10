import React, { useState } from "react";
import { TextField } from "@mui/material";
import "../styles/Login.css";

const Login = () => {

  const [email_phno, setEmail_phno] = useState();
  const [password, setPassword] = useState();

  const submitHandler = () =>{
    const payload = {
      email_phno : email_phno,
      password : password
    };
    console.log(payload);
  }

  return (
    <>
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
      <div className="footer">
        <div className="line1">
          <div className="articles">Read new updates from latest articles</div>
          <div className="articles">Privacy Policy</div>
          <div className="articles">User Policy</div>
          <div className="articles">About Us</div>
          <div className="articles">Careers</div>
          <div className="articles">Services</div>
        </div>
          <div className="contact"><h4>Contact us on</h4></div>
          <div className="contact"><p>Phone: +91 1234567890</p></div>
          <div className="contact"><p>Twitter</p></div>
          <div className="contact"><p>Email</p></div>
        <div className="copyright_container">
          <p className="copyright" align="center"> Ⓒ 2022 IndianChain</p>
        </div>
      </div>
    </>
  )
}

export default Login;