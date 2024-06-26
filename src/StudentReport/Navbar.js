import React from "react";
import { Link } from "react-router-dom";
function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Report
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/all">
                  All Students
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/department">
                  Department
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/attendence">
                  Attendence
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/attendance/report">
                  Attendence By Department
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/attendance/report/date">
                  Attendence By Date
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/college/new">
                  College
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/college/all">
                  All College
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/college/faculty">
                  Faculty
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/college/faculty/all">
                  All Faculty
                </Link>
              </li>
            </ul>
            <form className="d-flex">
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
