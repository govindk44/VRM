import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl, axiosInstance } from "../../axios";
import { useNavigate } from "react-router-dom";

export default function AddUser(props) {
  const [formValues, setFormValues] = useState({});
  const [specialists, setSpecialists] = useState({});
  const [formError, setFormError] = useState({});

  useEffect(() => {
    if (props.isEdit) {
      setFormValues(props.editrecordValues);
    }
  }, [props.editrecordValues]);
  
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
    if (props.isEdit) editVehicleOwner(formValues["id"]);
    else addVehicleOwner();
  };
  //EDIT
  const editVehicleOwner = async (id) => {
    await axiosInstance
      .put(apiUrl + `/user/vehicleowner/${id}`, formValues)
      .then((response) => {
        if (response.status === 200) {
          alert("Updated Successfully");
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  // Add Vehicle Owner
  const addVehicleOwner = async () => {
    await axiosInstance
      .post(apiUrl + "/user/vehicleowner", formValues)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          window.location.reload(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="container mt-5" style={{ maxWidth: "50%" }}>
      <form onSubmit={submit} method="post">
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="first_name">First Name</label>
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
            <input
              type="text"
              name="username"
              id="username"
              placeholder="username"
              className="form-control"
              onChange={onChangeHandler}
              defaultValue={formValues?.username}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="cpassword">Address</label>
            <textarea
              name="address"
              className="form-control"
              id="address"
              placeholder="address"

              defaultValue={formValues?.address}
              onChange={onChangeHandler}
            ></textarea>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="specialist">Mobile Number</label>
            <input
              type="text"
              name="mobile_no"
              id="mobile"
              placeholder="mobile_no"
              pattern="[6789][0-9]{9}" title="Please enter valid phone number"
              className="form-control"
              onChange={onChangeHandler}
              defaultValue={formValues?.mobile_no}
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <label htmlFor="email">Email</label>
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
        {!props.isEdit ? (
          <>
            <div className="row mb-2">
              <div className="col">
                <label htmlFor="password">Password</label>
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
                <input
                  type="text"
                  name="cpassword"
                  className="form-control"
                  id="cpassword"
                  placeholder="cpassword"
                  onChange={onChangeHandler}
                />
                <p>{formError?.password}</p>
              </div>
            </div>
          </>
        ) : null}
        <div className="row mt-2">
          <div className="col"></div>
          <div className="col-60">
            <button className="info">
              {props.isEdit ? "Edit" : "Add"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
