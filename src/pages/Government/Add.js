import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";
import { Web3Storage } from 'web3.storage';
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import axios from "axios";

const GovernmentAdd = () => {
  const options = [{
    label: "Citizen",
    value: 1
  }, {
    label: "Educational Institutions",
    value: 2
  }, {
    label: "Organizations",
    value: 3
  }]
  const [email, setEmail] = useState();
  const [selectedType, setSelectedType] = useState({ label: "Citizen", type: 1 });
  const [address, setAddress] = useState();
  const [response, setResponse] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { accounts, contract } = useSelector((state) => state);
  const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_IPFS_TOKEN });

  const submitHandler = async (e) => {
    setResponse("");
    e.preventDefault();
    try {
      if (selectedType.value == 1) {
        const payload = { email: email, address: setAddress, password: "123456", type: selectedType.value, address: address };
        await contract.methods.addCitizen(address, JSON.stringify(payload), email).send({ from: accounts[0], gas: "610000" });
      }
      else if (selectedType.value == 2) {
        const payload = { email: email, address: setAddress, password: "123456", type: selectedType.value, address: address };
        await contract.methods.addEducationalInstitution(address, JSON.stringify(payload), email).send({ from: accounts[0], gas: "610000" });
      }
      else if (selectedType.value == 3) {
        const payload = { email: email, address: setAddress, password: "123456", type: selectedType.value, address: address };
        await contract.methods.addOrganization(address, JSON.stringify(payload), email).send({ from: accounts[0], gas: "610000" });
      }
    }
    catch (err) {
      setResponse("Metamask failed!!!")
    }
  }

  return (<>
    <ul className="ul">
      <Link to="/" className="li"><span className="a">IndiaChain</span></Link>
      <Link to="/citizen/add" className="li active"><span className="a">Add Users</span></Link>
    </ul>
    <div className="flex justify-center mb-24">
      <div>
        <h2 className="heading">
          Indian Chain
        </h2>
        <h1 className="mt-10 color-blue-600 font-bold text-xl md:text-3xl">Add new citizen to blockchain</h1>
      </div>
    </div>
    <div className="flex justify-center">
      <div class="shadow-md md:w-3/4 rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4 mt-12 md:mx-10 mx-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Email of the User
          </label>
          <input value={email} onChange={(event) => { setEmail(event.target.value) }} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventname" type="text" placeholder="Email" />
        </div>
        <div class="mb-4 mt-12 md:mx-10 mx-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Blockchain Address
          </label>
          <input value={address} onChange={(event) => { setAddress(event.target.value) }} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventname" type="text" placeholder="Email" />
        </div>
        <div class="mb-4 mt-12 md:mx-10">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            User Type :
          </label>
          <Select
            options={options}
            value={selectedType}
            onChange={(selectedOption) => {
              setSelectedType(selectedOption);
            }}
            className="h-40"
          />
        </div>
        <button className="bg-blue-600 text-white flex m-auto mt-10 p-2 border rounded" onClick={submitHandler}>Add User</button>
        <p align="center" className="text-xl text-bold mt-12">{response}</p>
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
  </>)
}

export default GovernmentAdd;