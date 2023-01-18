import React,{ useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import web3 from "./ethereum/web3";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getContract = async () => {
        web3.eth.getAccounts().then((accounts,err)=>{
          dispatch({ type: "ACCOUNTS", payload: accounts });
        })
    };
    getContract();
}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element = {<Signup />} /> 
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
