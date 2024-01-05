import React, { useEffect, useState } from "react";
import { apiUrl, axiosInstance, generateRefreshToken } from "../../axios";

export default function AddEditVechicle() {
  const user_id = sessionStorage.getItem("user_id");
  const [formValues, setFormValues] = useState({});
  const [Vehicletypes, setVehicletypes] = useState({});

  useEffect(() => {
    getVehicleTypes();
  }, []);

  const getVehicleTypes = async () => {
    await axiosInstance
      .get(apiUrl + "/vehicle/types")
      .then((response) => {
        if (response.status === 200) {
          setVehicletypes(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          generateRefreshToken(error);
        }
      });
  };
  const onChangeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    addVehicle();
  };

  const fileload = (e) => {
    setFormValues({
      ...formValues,
      vehicle_image: e.target.files[0],
    });
  };
  const addVehicle = async () => {
    setFormValues({ ...formValues, ["user"]: user_id });
    console.log(formValues);

    await axiosInstance
      .post(apiUrl + "/vehicle/", formValues, {
        headers: { "Content-Type": "multipart/form-data" },
      })
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
    <div>
      <div className="container m-4">
        <form onSubmit={submit} method="post">
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="vechicle_type" className="form-label">
                Vehicle Type *
              </label>
              <select
                name="vehicle_type"
                id="vehicle_type"
                 onChange={onChangeHandler}
                className="form-control"
              >
                <option value="">Select</option>
                {Object.keys(Vehicletypes).map((key, i) => {
                  return (
                    <option value={Vehicletypes[key]["id"]}>
                      {Vehicletypes[key]["type"]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col">
              <label htmlFor="mileage" className="form-label">
                Mileage *
              </label>
              <input
                type="number"
                className="form-control"
                name="mileage"
                id="mileage"
                placeholder="mileage"
                onChange={onChangeHandler}
                defaultValue={formValues?.mileage}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="brand_name" className="form-label">
                Vehicle Brand Name
              </label>
              <input
                type="text"
                name="brand_name"
                className="form-control"
                id="brand_name"
                placeholder="brand_name"
                onChange={onChangeHandler}
                defaultValue={formValues?.brand_name}
              />
            </div>
            <div className="col">
              <label htmlFor="model_name" className="form-label">
                Vehicle Model Name
              </label>
              <input
                type="text"
                className="form-control"
                name="model_name"
                id="model_name"
                placeholder="model_name"
                onChange={onChangeHandler}
                defaultValue={formValues?.model_name}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="pickup_location" className="form-label">
                Pick-Up Location *
              </label>
              <input
                type="text"
                name="pickup_location"
                className="form-control"
                id="pickup_location"
                placeholder="pickup_location"
                onChange={onChangeHandler}
                defaultValue={formValues?.pickup_location}
              />
            </div>
            <div className="col">
              <label htmlFor="rate_per_hour" className="form-label">
                Rate/HR in Rupees *
              </label>
              <input
                type="text"
                className="form-control"
                name="rate_per_hour"
                id="rate_per_hour"
                placeholder="rate_per_hour"
                onChange={onChangeHandler}
                defaultValue={formValues?.rate_per_hour}
              />
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="free_kms" className="form-label">
                Free Kilometer *
              </label>
              <input
                type="number"
                name="free_kms"
                className="form-control"
                id="free_kms"
                placeholder="free_kms"
                onChange={onChangeHandler}
                defaultValue={formValues?.free_kms}
              />
            </div>
            <div className="col">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                placeholder="description"
                onChange={onChangeHandler}
                defaultValue={formValues?.description}
              ></textarea>
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <label htmlFor="free_kms" className="form-label">
                Vehicle Image *
              </label>
              <input
                type="file"
                name="vehicle_image"
                className="form-control"
                id="vehicle_image"
                onChange={fileload}
                accept="image/jpeg, image/png, image/jpg, image/gif"
                defaultValue={formValues?.vehicle_image}
              />
            </div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col">
              <button className="btn btn-primary">Add Vehicle</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
