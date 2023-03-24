import React,{useState, useContext} from "react";
import axios from "axios";
import { JobContext } from "../pages/Organization/PostedJobs";
import { useSelector, useDispatch } from "react-redux";
const MyJobs = ({ description, title, _id }) => {
  const dispatch = useDispatch();
  const { accounts, contract } = useSelector((state) => state);
  const user = useSelector((state) => state.auth);
  const Job = useContext(JobContext);

  const jobSelected = async () => {
    console.log({jobId: _id});
    const applicants = await axios.post("http://localhost:8080/get-job-applicants", { jobId: _id });
    console.log(applicants.data);
    let resume = [];
    let applicantss = [];
    for (const applicant of applicants.data) {
      console.log(applicant.email);
      const add = await contract.methods.getAddress(applicant.email).call({ from: accounts[0] });
      applicantss.push(applicant.email);
      console.log("add",add);
      const resum = await contract.methods.getResume(add).call({ from: accounts[0] });
      resume.push(resum);
    }
    console.log({ title: title, description: description, resume: resume, applicants: applicantss });
    const result = await axios.post("http://localhost:8000/recommend", { title: title, description: description, resume: resume, applicants: applicantss},{
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      }
    });
    Job.setRecommendApplicants(result.data);
    Job.setShowJob(true);
  }

  return (
    <tr class="border-b bg-gray-800 boder-gray-900">
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        {title}
      </td>
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        {description}
      </td>
      <td class="text-sm md:text-md text-white font-sans px-2 md:px-6 py-4 whitespace-nowrap">
        <button class="text-white bg-green-500 p-1" onClick={jobSelected}>View</button>
      </td>
    </tr>
  )
}

export default MyJobs;