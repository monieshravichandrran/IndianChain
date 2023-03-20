import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";
import { Web3Storage } from 'web3.storage';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const OrganizationalJob = () => {
  const [studentEmail, setStudentEmail] = useState();
  const [uploadedFile, setUploadedFile] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { accounts, contract } = useSelector((state) => state);
  const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_IPFS_TOKEN });
  const jobTitles = [{ label: 'Data Science', value: 'Data Science' }, { label: 'HR', value: 'HR' }, { label: 'Advocate', value: 'Advocate' }, { label: 'Arts', value: 'Arts' }, { label: 'Web Designing', value: 'Web Designing' },
  { label: 'Mechanical Engineer', value: 'Mechanical Engineer' }, { label: 'Sales', value: 'Sales' }, { label: 'Health and fitness', value: 'Health and fitness' }, { label: 'Civil Engineer', value: 'Civil Engineer' },
  { label: 'Java Developer', value: 'Java Developer' }, { label: 'Business Analyst', value: 'Business Analyst' }, { label: 'SAP Developer', value: 'SAP Developer' }, { label: 'Automation Testing', value: 'Automation Testing' },
  { label: 'Electrical Engineering', value: 'Electrical Engineering' }, { label: 'Operations Manager', value: 'Operations Manager' }, { label: 'Python Developer', value: 'Python Developer' },
  { label: 'DevOps Engineer', value: 'DevOps Engineer' }, { label: 'Network Security Engineer', value: 'Network Security Engineer' }, { label: 'PMO', value: 'PMO' }, { label: 'Database', value: 'Database' }, { label: 'Hadoop', value: 'Hadoop' },
  { label: 'ETL Developer', value: 'ETL Developer' }, { label: 'DotNet Developer', value: 'DotNet Developer' }, { label: 'Blockchain', value: 'Blockchain' }, { label: 'Testing', value: 'Testing' }];

  const submitHandler = async (e) => {
    e.preventDefault();
    const studentAddress = await contract.methods.getAddress(studentEmail).call({ from: accounts[0] });
    console.log(studentAddress);
    try {
      // const desc = await contract.methods.getResume(studentAddress).call({ from: accounts[0] }) + "\n" + description;
      // contract.methods.addEducationalDocument(studentAddress, asciiArray, desc).send({ from: accounts[0], gas: "6100000" });
    } catch (err) {
      // console.log(err);
    }
  }

  return (<>
    <ul className="ul">
      <Link to="/" className="li active"><span className="a">IndiaChain</span></Link>
      <Link to="/add" className="li"><span className="a">Add Files</span></Link>
      <Link to="/view" className="li"><span className="a">View Employee</span></Link>
      <Link to="/request" className="li"><span className="a">Request</span></Link>
      <Link to="/job" className="li"><span className="a">Jobs</span></Link>
    </ul>
    <div className="flex justify-center mb-24">
      <div>
        <h2 className="heading">
          Indian Chain
        </h2>
        <h1 className="mt-10 color-blue-600 font-bold text-xl md:text-3xl">Add a New Job in the Chain</h1>
      </div>
    </div>
    <div className="flex justify-center">
      <div class="shadow-md md:w-3/4 rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4 mt-12 md:mx-10 mx-2">
          <label class="block text-gray-700 text-sm font-bold mb-2">
            Job Description
          </label>
          <input value={jobDescription} onChange={(event) => { setJobDescription(event.target.value) }} class="shadow h-[20vh] appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventname" type="text" placeholder="Job Description" />
        </div>
        <button className="bg-blue-600 text-white flex m-auto mt-10 p-2 border rounded" onClick={submitHandler}>Add Job</button>
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

export default OrganizationalJob;