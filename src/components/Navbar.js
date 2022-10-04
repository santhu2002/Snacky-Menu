import React from "react";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <nav className={`navbar navbar-expand-lg bg-${props.mode}`}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Snacky Menu
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/viewitems">
                  View Items
                </Link>
              </li>
            </ul>
          </div>
        <button type="button" onClick={props.swapcolor} className="btn btn-secondary">Mode Change</button>
        </div>
      </nav>

    </>
  );
}

export default Navbar;
