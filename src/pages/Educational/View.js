import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/Login.css";
import { Web3Storage } from 'web3.storage';
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const EducationalView = () => {
    const [studentEmail, setStudentEmail] = useState();
    const [showFiles, setShowFiles] = useState();
    const [files, setFiles] = useState([]);
    const user = useSelector((state) => state.auth);
    const { accounts, contract } = useSelector((state) => state);
    const client = new Web3Storage({ token: process.env.REACT_APP_WEB3_IPFS_TOKEN });

    const convertToString = (asciiArray) => {
        let res = "";
        let filelist = [];
        for (let ele of asciiArray) {
            if (ele == 999) {
                filelist.push(res);
                res = "";
            }
            else
                res += String.fromCharCode(parseInt(ele));
        }
        return filelist;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const studentAddress = await contract.methods.getAddress(studentEmail).call({from: accounts[0]});
        console.log(studentAddress);
        const asciiArray = await contract.methods.getEducationalDocument(studentAddress).call({ from: accounts[0] });
        const resume = await contract.methods.getResume(studentAddress).call({from: accounts[0]});
        const d = resume.split("\n");
        const fileArray = convertToString(asciiArray);
        console.log(fileArray)
        setFiles(fileArray);
        setShowFiles(true);
    }

    return (<>
        <ul className="ul">
            <Link to="/" className="li"><span className="a">IndiaChain</span></Link>
            <Link to="/add" className="li"><span className="a">Add Files</span></Link>
            <Link to="/view" className="li active"><span className="a">View Student</span></Link>
            <Link to="/profile" className="li"><span className="a">Profile</span></Link>
            <Link to="/request" className="li"><span className="a">Request</span></Link>
        </ul>
        <div className="flex justify-center mb-24">
            <div>
                <h2 className="heading">
                    Indian Chain
                </h2>
                <h1 className="mt-10 color-blue-600 font-bold text-xl md:text-3xl">View document of students in the blockchain</h1>
            </div>
        </div>
        {showFiles ? <>
            <table class="min-w-full text-center">
                <thead class="border-b">
                    <tr className="border-b bg-indigo-100 border-indigo-200">
                        <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                            SNO
                        </th>
                        <th scope="col" class="text-bold text-gray-900 px-2 md:px-6 py-4">
                            View the file
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((item, index) => 
                    
                    <tr class="border-b bg-gray-800 boder-gray-900">
                        <td class="text-bold px-2 md:px-6 py-4 text-white">
                            {index + 1}
                        </td>
                        <td class="text-bold px-2 md:px-6 py-4 text-white">
                            <a target="_blank" href={"https://ipfs.io/ipfs/" + item}>View</a>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
            :
            <div className="flex justify-center">
                <div class="shadow-md md:w-3/4 rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4 mt-12 md:mx-10 mx-2">
                        <label class="block text-gray-700 text-sm font-bold mb-2">
                            Email of the Student
                        </label>
                        <input value={studentEmail} onChange={(event) => { setStudentEmail(event.target.value) }} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="eventname" type="text" placeholder="Email" />
                    </div>
                    <button className="bg-blue-600 text-white flex m-auto mt-10 p-2 border rounded" onClick={submitHandler}>View</button>
                </div>
            </div>
        }
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

export default EducationalView;