import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import Citizen from "./pages/Citizen/Home";
import CitizenView from "./pages/Citizen/View";
import CitizenRequest from "./pages/Citizen/Request";
import Job from "./pages/Citizen/Job";

import Educational from "./pages/Educational/Home";
import EducationalAdd from "./pages/Educational/Add";
import EducationalRequest from "./pages/Educational/Request";
import EducationalView from "./pages/Educational/View";

import Organization from "./pages/Organization/Home";
import OrganizationalAdd from "./pages/Organization/Add";
import OrganizationalJob from "./pages/Organization/Job";
import OrganizationalView from "./pages/Organization/View";
import PostedJobs from "./pages/Organization/PostedJobs";

import Government from "./pages/Government/Home";
import GovernmentAdd from "./pages/Government/Add";

import Record from "./ethereum/build/Record.json";
import web3 from "./ethereum/web3";
import { useDispatch } from "react-redux";
import NotFound from "./pages/NotFound";
import OrganizationalRequest from "./pages/Organization/Request";

export const RouteContext = createContext();

const App = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState(-1);
  useEffect(() => {
    const getContract = async () => {
      const instance = new web3.eth.Contract(
        Record.Record.abi,
        process.env.REACT_APP_CONTRACT_ADDRESS
      );
      web3.eth.getAccounts().then((accounts, err) => {
        dispatch({ type: "ACCOUNTS", payload: accounts });
      })
      dispatch({ type: "CONTRACT", payload: instance });
      console.log(instance);
    };
    getContract();
  }, []);
  return (
    <RouteContext.Provider value={{ type, setType }}>
      <BrowserRouter>
        <Routes>
          {type == -1 ?
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </>
            :
            <>{type == 1 ?
              <>
                <Route path="/" element={<Citizen />} />
                <Route path="/request" element={<CitizenRequest />} />
                <Route path="/view" element={<CitizenView />} />
                <Route path="/job" element={<Job />} />
                <Route path="*" element={<NotFound />} />
              </> :
              <>
                {type == 2 ?
                  <>
                    <Route path="/" element={<Educational />} />
                    <Route path="/add" element={<EducationalAdd />} />
                    <Route path="/request" element={<EducationalRequest />} />
                    <Route path="/view" element={<EducationalView />} />
                    <Route path="*" element={<NotFound />} />
                  </> : <>
                    {type == 3 ?
                      <>
                        <Route path="/" element={<Organization />} />
                        <Route path="/add" element={<OrganizationalAdd />} />
                        <Route path="view" element={<OrganizationalView />} />
                        <Route path="/job" element={<OrganizationalJob />} />
                        <Route path="/request" element={<OrganizationalRequest />} />
                        <Route path="/jobs/posted" element={<PostedJobs />} />
                        <Route path="*" element={<NotFound />} />
                      </>
                      :
                      <>{type == 4 ?
                        <>
                          <Route path="/" element={<Government />} />
                          <Route path="/candidate/add" element={<GovernmentAdd />} />
                          <Route path="*" element={<NotFound />} />
                        </> : null}
                      </>}
                  </>}
              </>
            }</>
          }
        </Routes>
      </BrowserRouter>
    </RouteContext.Provider>
  );
}

export default App;
