import React from "react";
import axios from "axios";

function AxiosRequestWithToken() {
  // get token
  let token = localStorage.getItem("token");
  let apiUrl = process.env.REACT_APP_TYPE
    ? "https://myfoodlab.herokuapp.com/"
    : "http://localhost:7000";
  // add tokens to headers of req obj
  let axiosReqWithToken = axios.create({
    baseUrl: apiUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return axiosReqWithToken;
}

export default AxiosRequestWithToken;
