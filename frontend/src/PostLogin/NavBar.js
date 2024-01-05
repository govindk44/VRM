import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function NavBar(props) {
  var user_type = sessionStorage.getItem("user_type");
  const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  useEffect(() => {
    if (!sessionStorage.getItem("name")) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      
      <nav class="navbar navbar-expand-lg navbar-dark text-light bg-info">
        <div class="container-fluid ">
          <a class="navbar-brand h3 text-light" href="#">
            Vehicle Renting System
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {user_type === "admin" ? (
                <>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/admin/users">
                      Users
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      aria-current="page"
                      href="/admin/vehicle-owner"
                    >
                      Vehicle Owners
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      aria-current="page"
                      href="/ad/ChangePassword"
                    >
                      ChanagePassword
                    </a>
                  </li>
                </>
              ) : null}
              {user_type === "normal_user" ? <></> : null}
              {user_type === "vehicle_owner" ? (
                <>
                  <li class="nav-item">
                    <a class="nav-link" aria-current="page" href="/vo/vehicles">
                      Vehicles
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      aria-current="page"
                      href="/ad/ChangePassword"
                    >
                      ChanagePassword
                    </a>
                  </li>
                  <li class="nav-item">
                    <a
                      class="nav-link"
                      aria-current="page"
                      href="/vo/vehicle-bookings"
                    >
                      Bookings
                    </a>
                  </li>
                </>
              ) : null}
            </ul>
            <h6 className="px-2">
              <i class="bi bi-person-circle px-3"></i>WelCome,{" "}
              {sessionStorage.getItem("name")}
            </h6>
            <a href="#" onClick={logout} className="nav-link">
              <button className="btn btn-link p-1 pt-0">
                <i class="bi bi-box-arrow-left"></i>
              </button>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
