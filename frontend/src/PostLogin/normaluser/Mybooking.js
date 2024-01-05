import React, { useEffect, useState } from "react";
import { apiUrl, axiosInstance, generateRefreshToken } from "../../axios";

export default function VehicleBookings() {
  const [vehiclesbookings, setVehicleBookings] = useState({});
  // const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    getVehicleBookings();
  }, []);
  const updateVehicleBookingStatus = async (bookingid, status_type) => {
    await axiosInstance
      .put(apiUrl + "/vehicle/book/" + bookingid + "/" + status_type)
      .then((response) => {
        if (response.status === 200) {
          alert(response.data);
          window.location.reload(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          generateRefreshToken(error);
        }
      });
  };

  const getVehicleBookings = async () => {
    await axiosInstance
      .get(
        apiUrl + "/vehicle/book/" + sessionStorage.getItem("user_id")
      )
      .then((response) => {
        if (response.status === 200) {
          setVehicleBookings(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
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
              <h4>vehiclebookings</h4>
              <tr>
                <th>SLNo</th>
                <th>Vehicle</th>
                <th>Booking_status</th>
                <th>Booked_by</th>
                <th>From_time</th>
                <th>To_time</th>
                <th>Created_at</th>
                <th>Updated_at</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(vehiclesbookings).map((key, i) => {
                return (
                  <tr key={`user_rows${i}`}>
                    <td>{i + 1}</td>
                    <td>{vehiclesbookings[key]["vehicle"]}</td>
                    <td>{vehiclesbookings[key]["booking_status"]}</td>
                    <td>{vehiclesbookings[key]["booked_by"]}</td>
                    <td>{vehiclesbookings[key]["from_time"].toString()}</td>
                    <td>{vehiclesbookings[key]["to_time"]}</td>
                    <td>{vehiclesbookings[key]["created_at"]}</td>
                    <td>{vehiclesbookings[key]["update_at"]}</td>
                    <td>{vehiclesbookings[key]["Action"]}</td>

                    
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
