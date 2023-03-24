import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = ({ type }) => {
  return (
    <>
      {type == 1 ?
        <div className="topnav">
          <span className="spans">Indian Chain</span>
          <span className="span active">Requests</span>
          <span className="span inactive">View your chain</span>
          <span className="span inactive">Profile</span>
          <button className="btn">Logout</button>
        </div>
        : <h1>Bye</h1>}
    </>
  )
}

export default Navbar;