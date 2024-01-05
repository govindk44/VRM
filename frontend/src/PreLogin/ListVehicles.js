import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl, axiosInstance } from "../axios";
import { useNavigate } from "react-router-dom";

export default function ListVehicles(props) {
  const [vehicles, setvehicles] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    getvehicle();
  }, [props.searchData]);
  
  const confirmBooking=(id)=>{
    if(!sessionStorage.getItem('user_id')){
      document.location.href = "/login";
    }
    else{
  var booking_data = {
    vehicle: id,
    booked_by:sessionStorage?.getItem('user_id'),
    from_time:props.searchData.from_time,
    to_time:props.searchData.to_time
  } 

  axiosInstance.post(`${apiUrl}/vehicle/book/`,booking_data).then((response)=>{
    if(response.status === 200){
      alert(response.data)
     document.location.href = "/"
    }
  }).catch((error)=>{
    console.log(error)
  })
}
  
  }

  
  //LIST

  const getvehicle = async () => {
    await axios
      .put(apiUrl + "/vehicle/available/", props.searchData)
      .then((response) => {
        if (response.status === 200) {
          setvehicles(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {Object.keys(props.searchData).length ? (
        <>
          {Object.keys(vehicles).length > 0 ? (
            <h2 className="section-subheading text-muted">
              vehicles are Available at {props.searchData.pickup_location}
            </h2>
          ) : (
            <h3 className="text-center">
              Oops!! Sorry, No vehicle are Available currently
              {props.searchData.pickup_location
                ? ` in ${props.searchData.pickup_location}`
                : ""}
            </h3>
          )}
        </>
      ) : (
        <>
          {" "}
          <h3 className="text-center">
            Please Search, To Get Available Vehicles
          </h3>
        </>
      )}

      <div className="container d-flex">
        {Object.keys(vehicles).map((key, i) => {
          return (
            <div class="card px-3" style={{margin:'10px', width: "18rem",height:'300px' }}>
              <img
                src={`${apiUrl}${vehicles[key]["vehicle_image"]}`}
                class="card-img-top m-0"
                alt="..."
                style={{maxHeight:'100px'}}
              />
              <div class="card-body">
                <h5 class="card-title">{vehicles[key]["brand_name"]}</h5>
                <p style={{ fontSize: "80%", margin: 0, padding: 0 }}>
                  {vehicles[key]["vehicle_type_name"]}{" "}
                  {vehicles[key]["model_name"]}
                </p>
                <p class="card-text">
                  <strong>Mileage : {vehicles[key]["mileage"]} kms/ltr</strong>
                </p>
                <p class="card-text">
                  <strong>Rs. {vehicles[key]["rate_per_hour"]} /Hr</strong>
                </p>
                <a
                  href={`vehicles/view-details/${vehicles[key]["id"]}/${props.searchData?.from_date}/${props.searchData?.to_date}`}
                  class="btn btn-primary"
                  data-bs-toggle="modal" data-bs-target={`#exampleModal${i}`}
                >
                  View Details
                </a>
              </div>
              <div class="modal fade" id={`exampleModal${i}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div className="container">
          <table>
            <tr>
              <td>Brand Name :</td>
              <td>{vehicles[key]['brand_name']}</td>
            </tr>
            <tr>
              <td>vehicle_type :</td>
              <td>{vehicles[key]['vehicle_type']}</td>
            </tr>
            <tr>
              <td>mileage :</td>
              <td>{vehicles[key]['mileage']}</td>
            </tr>
            <tr>
              <td>pickup_location :</td>
              <td>{vehicles[key]['pickup_location']}</td>
            </tr>
            <tr>
              <td>rate_per_hour :</td>
              <td>{vehicles[key]['rate_per_hour']}</td>
            </tr>
            <tr>
              <td>free_kms :</td>
              <td>{vehicles[key]['free_kms']}</td>
            </tr>
            <tr>
              <td>description :</td>
              <td>{vehicles[key]['description']}</td>
            </tr>
            
          </table>
          </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={()=>{confirmBooking(vehicles[key]['id'])}} class="btn btn-primary">Book Vehicle</button>
      </div>
    </div>
  </div>
</div> 
            </div>
          );
        })}
      </div>
    </div>
  );
}
