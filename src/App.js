import React,{ useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import web3 from "./ethereum/web3";

function App() {
  useEffect(() => {
    const getContract = async () => {
        web3.eth.getAccounts().then((accounts,err)=>{
          console.log("accounts: ",accounts);
        })
    };
    getContract();
}, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element = {<Signup />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
