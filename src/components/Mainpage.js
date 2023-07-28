import React, { useContext, useState } from "react";
import Card from "./Card";
import Viewitems from "./Viewitems"
import itemcontext from "../context/items/itemcontext";

function Mainpage(props) {
  const context = useContext(itemcontext);
  const { additem } = context;

  const [item, setitem] = useState({ title: "", price:0 });
  const handleclick = (e) => {
    //not to reload the page
    e.preventDefault();

    additem(item.title, item.price);
    setitem({ title: "", price:0});
  };
  const onChange = (e) => {
    setitem({ ...item, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container  ">
        {/* <Card /> */}
        <Viewitems/>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Add New item Here
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span
                    className="input-group-text"
                    id="inputGroup-sizing-default"
                  >
                    Title
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    aria-label="Sizing example input"
                    aria-describedby="inputGroup-sizing-default"
                    name="title" value={item.title}  onChange={onChange} required
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Price</span>
                  <input
                    type="number"
                    className="form-control"
                    aria-label="Dollar amount (with dot and two decimal places)"
                    name="price" value={item.price}  onChange={onChange} required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="button" disabled={item.title.length===0 } className="btn btn-primary" onClick={handleclick}>
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-info  m-3"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Item
        </button>
      </div>
    </>
  );
}

export default Mainpage;
