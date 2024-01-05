import React, { useEffect, useState } from 'react'
import { apiUrl, axiosInstance, generateRefreshToken } from '../../axios';

export default function AllUsers() {
      const [users, setUsers] = useState({});
      useEffect(() => {
        getUser();
      }, []);
     
      //LIST
      const getUser = async () => {
        await axiosInstance
          .get(apiUrl + "/user")
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
        <h3>All Users</h3>
      </div>
      <div className="container m-5">
        <div className="mt-3">
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>SLNo</th>
                <th>Name</th>
                <th>UserName</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>User Type</th>
                <th>Address</th>
                <th>Created On</th>
                
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
                    <td>{users[key]['username']}</td>
                    <td>{users[key]["email"]}</td>
                    <td>{users[key]["mobile_no"]}</td>
                    <td>{(users[key]['is_superuser'])? "Super Admin":(users[key]['is_vehicle_owner'])? "Vehicle Owner": "Normal Users"}</td>
                    <td>{users[key]["address"]}</td>
                    <td>{users[key]["date_joined"]?.split("T")[0]}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
