import React, { useState, useEffect } from "react";
import india from "../../images/india.png";
import "../../styles/Login.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { Space, Table, Tag } from 'antd';
import { Link } from "react-router-dom";

const CitizenView = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const [requests, setRequests] = useState([]);
  useEffect(() => {
    const getRequests = async () => {
      const a = await axios.post(process.env.REACT_APP_BACKEND_API_BASE_URL + "/get-requests", { email: user.user });
      setRequests(a.data);
       console.log(a.data)
      setShow(true);
    }
    getRequests();
  }, [])
  const columns = [
    {
      title: 'Request From',
      dataIndex: 'authority',
      key: 'authority',
    },
    {
      title: 'Request Type',
      dataIndex: 'type',
      key: 'type',
    }];
  return (
    <>
      <ul className="ul">
        <Link to="/" className="li"><span className="a">IndiaChain</span></Link>
        <Link to="/requests" className="li active"><span className="a">Requests</span></Link>
        <Link to="/view" className="li"><span className="a">View your chain</span></Link>
        <Link to="/profile" className="li"><span className="a">Profile</span></Link>
        <Link to="/request" className="li"><span className="a">Logout</span></Link>
      </ul>
      {show ?
        <>
          <div className="w-full flex justify-center">
            <h2 className="heading">
              Indian Chain
            </h2>
            <p className="">You have {requests?.length} requests</p>
          </div>
          <Table columns={columns} dataSource={requests} />
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
        </> : null}
    </>
  )
}

export default CitizenView;