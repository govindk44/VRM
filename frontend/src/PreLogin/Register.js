import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formValues, setFormValues] = useState({});
  const [specialists, setSpecialists] = useState({});
  const [formError, setFormError] = useState({});

  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    if (e.target.name === "cpassword") {
      if (e.target.value !== formValues?.password) {
        setFormError({ ...formError, ["password"]: "*password not matched" });
      } else {
        setFormError({ ...formError, ["password"]: "" });
      }
    } else {
      setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }
  };
  const submit = (e) => {
    e.preventDefault();
    userRegister();
    console.log(formValues);
  };
  // Register
  const userRegister = async () => {
    await axios
      .post(apiUrl + "/user/", formValues)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "35%",boxShadow: "2px 3px 8px black",backgroundColor: "lightblue" }}>
      <h3 className="text-dark text-center m-4">Registration</h3>
      <form onSubmit={submit} method="post">
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="first_name">First Name</label>
          </div>
          <div className="col">
            <input
              required
              type="text"
              name="first_name"
              id="first_name"
              placeholder="first_name"
              className="form-control"
              onChange={onChangeHandler}
              defaultValue={formValues?.first_name}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="last_name">Last Name</label>
          </div>
          <div className="col">
            <input
              type="text"
              name="last_name"
              id="last_name"
              placeholder="last_name"
              className="form-control"
              onChange={onChangeHandler}
              defaultValue={formValues?.last_name}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="last_name">UserName</label>
          </div>
          <div className="col">
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="form-control"
              onChange={onChangeHandler}
              defaultValue={formValues?.last_name}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="specialist">Mobile Number</label>
          </div>
          <div className="col">
            <input
              type="text"
              name="mobile_no"
              id="mobile"
              placeholder="mobile"
              pattern="[6789][0-9]{9}" title="Please enter valid phone number"
              className="form-control"
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="email">Email</label>
          </div>
          <div className="col">
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
              className="form-control"
              onChange={onChangeHandler}
              defaultValue={formValues?.email}
            />
          </div>
        </div>{" "}
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="password">Password</label>
          </div>
          <div className="col">
            <input
              type="password"
              className="form-control"
              name="password"
              id="password"
              placeholder="password"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one  number and one uppercase and lowercase letter, and at least 8 or more characters"
              defaultValue={formValues?.password}
              onChange={onChangeHandler}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="cpassword">Confirm Password</label>
          </div>
          <div className="col">
            <input
              type="text"
              name="cpassword"
              placeholder="cpassword"
              className="form-control"
              id="cpassword"
              onChange={onChangeHandler}
            />
            <p>{formError?.password}</p>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col"></div>
          <div className="col-8">
            <button className="btn btn-dark">Register</button>
          </div>
        </div>
      </form>
    </div>
  );
}
