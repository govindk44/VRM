import React, { useEffect, useState } from "react";
import { apiUrl, axiosInstance, generateRefreshToken } from "../../axios";

export default function ListVehicles() {
  const [vehicles, setVehicles] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [Vehicletypes, setVehicletypes] = useState({});
  const [vehicle_id, setVehicleId] = useState("");
  const [formValues, setFormValues] = useState({});
  const onChangeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    editVehicle();
  };

  const fileload = (e) => {
    setFormValues({
      ...formValues,
      vehicle_image: e.target.files[0],
    });
  };
  const editVehicle = async () => {
    setFormValues({ ...formValues, ["user"]: sessionStorage?.getItem('user_id') });
    console.log(formValues);

    await axiosInstance
      .put(apiUrl + "/vehicle/" + formValues?.id, formValues, {
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
  useEffect(() => {
    getVehicles();
    getVehicleTypes();
  }, []);

  const setEditRecord = (record) => {
    setIsEdit(true);
    setFormValues({ ...record });
    // setVehicles(record);
  };
  // Delete
  const deleteVehicle = async (id) => {
    await axiosInstance
      .delete(apiUrl + `/vehicle/${id}`)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          getVehicles();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getVehicles = async () => {
    await axiosInstance
      .get(apiUrl + "/vehicle/get/" + sessionStorage.getItem("user_id"))
      .then((response) => {
        if (response.status === 200) {
          setVehicles(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          generateRefreshToken(error);
        }
      });
  };
  return (
    <div>
      <div className="container m-5">
        <div className="mt-3">
          <table className="table table-stripped">
            <thead className="thead-dark">
              <tr>
                <th>SLNo</th>
                <th>Vehicle Type</th>
                <th>Brand Name</th>
                <th>Model</th>
                <th>Mileage</th>
                <th>PickUp Location</th>
                <th>Free Kms</th>
                <th>Rate/hr</th>
                <th>Description</th>
                <th>Vehicle Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(vehicles).map((key, i) => {
                return (
                  <>
                    <tr key={`user_rows${i}`}>
                      <td>{i + 1}</td>
                      <td>{vehicles[key]["vehicle_type_name"]}</td>
                      <td>{vehicles[key]["brand_name"]}</td>
                      <td>{vehicles[key]["model_name"]}</td>
                      <td>{vehicles[key]["mileage"]}</td>
                      <td>{vehicles[key]["pickup_location"]}</td>
                      <td>{vehicles[key]["free_kms"]}</td>
                      <td>{vehicles[key]["rate_per_hour"]}</td>
                      <td>{vehicles[key]["description"]}</td>
                      <td>
                        <img
                          src={apiUrl + vehicles[key]["vehicle_image"]}
                          className="img-fluid"
                          style={{ maxWidth: "100px" }}
                        />
                      </td>
                      <td>
                        {" "}
                        <a
                          href=""
                          onClick={() => setEditRecord(vehicles[key])}
                          className="px-2 text-primary"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                        >
                          <i class="bi bi-pencil"></i>
                        </a>
                        <a
                          href="#"
                          onClick={() => deleteVehicle(vehicles[key]["id"])}
                          className="text-danger"
                        >
                          <i class="bi bi-trash3"></i>
                        </a>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
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
                            <option
                              selected={
                                Vehicletypes[key]["id"] ==
                                formValues?.vehicle_type
                                  ? true
                                  : false
                              }
                              value={Vehicletypes[key]["id"]}
                            >
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
                      <button className="btn btn-primary">Edit Vehicle</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
           
          </div>
        </div>
      </div>
    </div>
  );
}