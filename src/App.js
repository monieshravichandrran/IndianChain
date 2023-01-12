import React,{ useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import web3 from "./ethereum/web3";

function App() {
  useEffect(() => {
    const getContract = async () => {
        // const provider = new Web3.providers.HttpProvider(
        //     "http://127.0.0.1:7545"
        // );
        // const web3 = new Web3(provider);
        // const instance = new web3.eth.Contract(
        //     JSON.parse(Record.interface),
        //     contractAddress
        // );
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
