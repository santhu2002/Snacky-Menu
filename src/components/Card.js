import React ,{useContext}from "react";
import { Link } from "react-router-dom";
import itemcontext from "../context/items/itemcontext";

function Card(props) {
  const {title,price}=props
  const context = useContext(itemcontext);
  const { deleteitem} = context;

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
        <button type="button" onClick={()=>{deleteitem(props.item._id)}} className="btn btn-primary mx-3">
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
