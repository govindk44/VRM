import React, { useEffect, useState } from "react";
import AddUser from "./AddUser";
import { apiUrl, axiosInstance, generateRefreshToken } from "../../axios";
export default function VehicleOwners() {
  const [users, setUsers] = useState({});
  
  const [isEdit, setIsEdit] = useState(false);
  const [editrecordValues, setEditRecordValues] = useState({});
  useEffect(() => {
    getUser();
  }, []);
  const setEditRecord = (record) => {
    setIsEdit(true);
    setEditRecordValues(record);
  };
  // // Delete
  // const deleteUser = async (id) => {
  //   await axiosInstance
  //     .delete(apiUrl + `/user/${id}`)
  //     .then((response) => {
  //       if (response.status === 200) {
  //         alert(response.data);
  //         getUser();
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  //LIST
  const getUser = async () => {
    await axiosInstance
      .get(apiUrl + "/user/vehicleowner")
      .then((response) => {
        if (response.status === 200) {
          setUsers(response.data);
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
      <div className="row m-3">
        <h2>Vehicle Owners</h2>
      </div>
      <div className="container m-5">
        <button
          className="btn btn-primary float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Vehicle Owners
        </button>
        <div className="mt-3">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>SLNo</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>Address</th>
                <th>Created On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(users).map((key, i) => {
                return (
                  <tr key={`user_rows${i}`}>
                    <td>{i + 1}</td>
                    <td>
                      {users[key]["first_name"] + " " + users[key]["last_name"]}
                    </td>
                    <td>{users[key]["email"]}</td>
                    <td>{users[key]["mobile_no"]}</td>
                    <td>{users[key]["address"]}</td>
                    <td>
                      {users[key]["date_joined"]?.split("T")[0] }
                    </td>
                    <td>
                      <a
                        href=""
                        onClick={() => setEditRecord(users[key])}
                        className="px-2 text-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        <i class="bi bi-pencil"></i>
                      </a>
                      {/* <a
                        href="#"
                        onClick={() => deleteUser(users["id"])}
                        className="text-danger"
                      >
                        <i class="bi bi-trash3"></i>
                      </a> */}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Add User
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body p-0">
              <AddUser
                isEdit={isEdit}
                editrecordValues={editrecordValues}
                getDoctors={getUser}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
