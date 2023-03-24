import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import TableItem from "../../components/TableItem";
import { Link } from "react-router-dom";
import JobItem from "../../components/JobItem";

const Job = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const { accounts, contract } = useSelector((state) => state);
  const [show, setShow] = useState(false);
  const [Jobs, setJobs] = useState([]);
  useEffect(() => {
    const fn = async () => {
      const resume = await contract.methods.getResume(accounts[0]).call({ from: accounts[0] });
      console.log(resume);
      const jobField = await axios.post("http://localhost:8000/job", { resume: resume }, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      });
      console.log(jobField.data);
      const jobs = await axios.post(process.env.REACT_APP_BACKEND_API_BASE_URL + "/get-job-by-type", { type: jobField.data });
      setJobs(jobs.data);
      setShow(true);
    }
    fn();
  }, [])
  return (
    <>
      <ul className="ul">
        <Link to="/" className="li active"><span className="a">IndiaChain</span></Link>
        <Link to="/request" className="li"><span className="a">Requests</span></Link>
        <Link to="/view" className="li"><span className="a">View your chain</span></Link>
        <Link to="/job" className="li"><span className="a">Job</span></Link>
      </ul>
      {show ?
        <>
          <div className="w-full flex justify-center">
            <div>
              <h2 className="mt-20 text-orange-400 text-4xl">
                Indian Chain
              </h2>
            </div>
          </div>
          <table class="min-w-full text-center">
            <thead class="border-b">
              <tr className="border-b bg-indigo-100 border-indigo-200">
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  Company Name
                </th>
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  Job Title
                </th>
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  Description
                </th>
                <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                  Apply
                </th>
              </tr>
            </thead>
            <tbody>
              {Jobs?.map((item) => {
                return (
                  <JobItem
                    organization={item.organization}
                    title={item.title}
                    description={item.description}
                    _id={item._id}
                    key={item._id}
                  />
                )
              })}
            </tbody>
          </table>
        </> : null}
    </>
  )
}

export default Job;