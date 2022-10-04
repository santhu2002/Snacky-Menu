import React from "react";
import { Link } from "react-router-dom";

function card(props) {
  const {title,price}=props
  return (
    <div className="card w-25 m-3">
      <div className="card-body">
        <h5 className="card-title">Title: {title}</h5>
        <p className="card-text">
          Price: {price}
        </p>
        <Link to="/" className="btn btn-primary ">
          Edit
        </Link>
        <Link to="/" className="btn btn-primary mx-3">
          Delete
        </Link>
      </div>
    </div>
  );
}

export default card;
