import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../axios";
import jwt_decode from "jwt-decode";

export default function Login() {
  const navigate = useNavigate();
  const [formvalues, setformvalues] = useState({});
  const [formError, setFromError] = useState("");
  const onChangeHandler = (e) => {
    setformvalues({ ...formvalues, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(apiUrl + "/api/token/", formvalues)
      .then((response) => {
        sessionStorage.setItem("access_token", response.data.access);
        sessionStorage.setItem("refresh_token", response.data.refresh);
        var user = jwt_decode(response.data.access);
        var userId = user.user_id;
        var username = user.name;
        var user_type = user.user_type;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
        sessionStorage.setItem("user_id", userId);
        sessionStorage.setItem("name", username);
        sessionStorage.setItem("user_type", user_type);
        if (user_type === "admin") navigate("/admin/users");
        else if (user_type === "vehicle_owner") navigate("/vo/vehicles");
        else if (user_type === "normal_user") navigate("/nu/mybooking");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setFromError(error.response.data.detail);
        }
      });
  };
  return (
    <div>
      <div
        className="container mt-5 p-4"
        style={{ maxWidth: "50%", boxShadow: "2px 3px 8px black",backgroundColor: "lightblue"}}
        
      >
        <form onSubmit={onSubmit} method="post" className="form">
          <div className="row mt-3 mb-3">
            <h4 className="text-center">
              <i class="bi bi-person-circle px-3"></i>Login
            </h4>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="" className="form-label">
                UserName
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                className="form-control"
                id=""
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label htmlFor="" className="form-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
                className="form-control"
                id=""
                onChange={onChangeHandler}
              />
            </div>
          </div>
          <p>{formError}</p>
          <p>
            New User?<a href="register">Register here</a>
            <br></br> 
          
          </p>
          <div className="row mb-3">
            <div className="col">
              <button className="btn btn-dark col-3">Login</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
