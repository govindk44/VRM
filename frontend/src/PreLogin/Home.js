import React, { useEffect, useState } from "react";
import "./Home.css";
import Login from "./Login";
import { apiUrl } from "../axios";
import axios from "axios";
import ListVehicles from "./ListVehicles";
export default function Home() {
  const [searchData, setSearchData] = useState({});
  const [pickuplocations, setPickupLocations] = useState({});
  const [formValues, setFormValues] = useState({});
  useEffect(() => {
    getpickupLocations();
  }, []);
  const search = (e) => {
    e.preventDefault();
    var from_time = formValues.from_date + "T" + formValues.from_time + ":00";
    var to_time = formValues.to_date + "T" + formValues.to_time + ":00";

    setSearchData({
      ...formValues,
      ['from_time']: from_time,
      ['to_time']: to_time,
    });
  };
  const onChangeHandler = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const getpickupLocations = async () => {
    await axios
      .get(`${apiUrl}/vehicle/pickup-locations`)
      .then((response) => {
        if (response.status === 200) {
          setPickupLocations(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div id="page-top">
      <header className="masthead">
        <div className="container">
          <div className="masthead-subheading text-light">Vehicle Renting System</div>
          <div className="masthead-heading text-info">
            Get Ready To Ride
          </div>
          {
            <a
              className="btn btn-danger btn-xl text-uppercase"
              href="#services"
            >
              Tell Me More
            </a>
          }
        </div>
      </header>
      <form onSubmit={search}>
        <div className="container mt-3 p-5" style={{ maxWidth: "60%" }}>
          <h5>Search</h5>
          <div className="row">
            <label htmlFor="to_date">From</label>
            <div className="col">
              <input
                onChange={onChangeHandler}
                type="date"
                name="from_date"
                id="from_date"
                className="form-control"
              />
            </div>
            <div className="col">
              <input
                onChange={onChangeHandler}
                type="time"
                name="from_time"
                id="from_time"
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-3">
            <label htmlFor="to">To</label>
            <div className="col">
              <input
                onChange={onChangeHandler}
                type="date"
                name="to_date"
                id="to_date"
                className="form-control"
              />
            </div>
            <div className="col">
              <input
                type="time"
                name="to_time"
                id="to_time"
                onChange={onChangeHandler}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col">
              <label htmlFor="pickup_location">Pick Up Location</label>
              <select
                onChange={onChangeHandler}
                name="pickup_location"
                className="form-control"
                id="pickup_location"
              >
                <option value="">SELECT</option>
                {Object.keys(pickuplocations).map((key, i) => {
                  return (
                    <option value={pickuplocations[key]["pickup_location"]}>
                      {pickuplocations[key]["pickup_location"]}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col"></div>
          </div>
          <div className="row">
            <div className="col">
              <button className="mt-3 btn btn-danger">Search</button>
            </div>
          </div>
        </div>
      </form>
      <section className="page-section" id="Vehical">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Vehical</h2>
            <h3 className="section-subheading text-muted">Cars/Bikes</h3>
          </div>
          <div className="row">
            <ListVehicles searchData={searchData} />
          </div>
        </div>
      </section>
      <section className="page-section" id="services">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">Services</h2>
            <h3 className="section-subheading text-muted">
              Lorem ipsum dolor sit amet consectetur.
            </h3>
          </div>
          <div className="row text-center">
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-shopping-cart fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">E-Commerce</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Responsive Design</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fas fa-circle fa-stack-2x text-primary"></i>
                <i className="fas fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="my-3">Web Security</h4>
              <p className="text-muted">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima
                maxime quam architecto quo inventore harum ex magni, dicta
                impedit.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="page-section" id="about">
        <div className="container">
          <div className="text-center">
            <h2 className="section-heading text-uppercase">About</h2>
            <h3 className="section-subheading text-muted">
              Vehical Servic Center.
            </h3>
          </div>
        </div>
      </section>
    </div>
  );
}
