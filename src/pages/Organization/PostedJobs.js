import React, { useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";
import { Web3Storage } from 'web3.storage';
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import axios from "axios";
import MyJobs from "../../components/MyJobs";
import RecommendApply from "../../components/RecommendApplicants";

export const JobContext = createContext();

const PostedJobs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { accounts, contract, auth } = useSelector((state) => state);
  const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_IPFS_TOKEN });
  const [show, setShow] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [recommendApplicants, setRecommendApplicants] = useState();
  const [Jobs, setJobs] = useState([]);

  useEffect(() => {
    const fn = async () => {
      const jobs = await axios.post(process.env.REACT_APP_BACKEND_API_BASE_URL + "/get-all-jobs", { email: user.user });
      setJobs(jobs.data);
      setShow(true);
    }
    fn();
  }, [])

  const jobSelected = async (id, title, description) => {
    const applicants = await axios.post(process.env.REACT_APP_BACKEND_API_BASE_URL + "/get-job-applicants", { jobId: id });
    let resume = [];
    for (const applicant of applicants) {
      const add = await contract.methods.getAddress(applicant).call({ from: accounts[0] });
      const resum = await contract.methods.getResume(add).call({ from: accounts[0] });
      resume.push(resum);
    }
    const result = await axios.post("http://localhost:8000/recommend", { title: title, description: description, resume: resume, applicants: applicants }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    });
  }



  return (<JobContext.Provider value={{ setShowJob, setRecommendApplicants }}>
    <ul className="ul">
      <Link to="/" className="li active"><span className="a">IndiaChain</span></Link>
      <Link to="/add" className="li"><span className="a">Add Files</span></Link>
      <Link to="/view" className="li"><span className="a">View Employee</span></Link>
      <Link to="/request" className="li"><span className="a">Request</span></Link>
      <Link to="/job" className="li"><span className="a">Jobs</span></Link>
    </ul>
    {showJob ?
      <>
        <div className="flex justify-center mb-24">
          <div>
            <h2 className="heading">
              Indian Chain
            </h2>
          </div>
          <table class="min-w-full text-center">
            <thead class="border-b">
              <tr className="border-b bg-indigo-100 border-indigo-200">
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  SNO
                </th>
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  Email of Applicant
                </th>
              </tr>
            </thead>
            <tbody>
              {recommendApplicants.map((item, index) => {
                return (<RecommendApply index={index + 1} email={item} />)
              })}
            </tbody>
          </table>
        </div>
      </> :
      <>
        <div className="flex justify-center mb-24">
          <div>
            <h2 className="heading">
              Indian Chain
            </h2>
            <h1 className="mt-10 color-blue-600 font-bold text-xl md:text-3xl">Your Jobs</h1>
          </div>
        </div>
        {show ?
          <table class="min-w-full text-center">
            <thead class="border-b">
              <tr className="border-b bg-indigo-100 border-indigo-200">
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  Title
                </th>
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  Description
                </th>
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  View
                </th>
              </tr>
            </thead>
            <tbody>
              {Jobs.map((item) => {
                return (
                  <MyJobs title={item.title} description={item.description} _id={item._id} key={item._id} setShowJob={setShowJob} />
                )
              })}
            </tbody>
          </table> : null}
      </>}
  </JobContext.Provider>)
}

export default PostedJobs;