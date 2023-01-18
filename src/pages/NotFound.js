import React from "react";
import {useSelector, useDispatch} from "react-redux";

const NotFound = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  return (
    <>
        <h1>Page Not found</h1>
        <h2>You have been logged out</h2>
    </>
  )
}

export default NotFound;