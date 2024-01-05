import React from "react";
import { useNavigate } from "react-router-dom";


export default function NavBar(props) {
   const navigate = useNavigate();
  const logout = () => {
    sessionStorage.clear();
    navigate("/");
  };
  return (
    <div>
     <nav class="navbar navbar-expand-lg navbar-dark text-light bg-info ">
        <div class="container-fluid">
          <a class="navbar-brand h3 text-light" href="/">
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
              {sessionStorage?.getItem('user_id') ? (
                <>
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
                    <a class="nav-link" aria-current="page" href="/nu/mybooking">
                      mybooking
                    </a>
                  </li></>):null}
                  </ul>
                  {sessionStorage?.getItem('user_id')  ? <a class="nav-link"onClick={logout} aria-current="page" href="#">
                      logout
                    </a>:<a href="/login" className="nav-link">
              <i class="bi bi-person-circle px-3"></i> Login / Register
            </a>}
            
          </div>
        </div>
      </nav>
    </div>
  );
}
