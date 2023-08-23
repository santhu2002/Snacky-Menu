import React, { useContext, useEffect } from "react";
import Card from "./Card";
import { useHistory } from 'react-router-dom';
import itemcontext from "../context/items/itemcontext";

function Viewitems(props) {
  const context = useContext(itemcontext);
  const { items, getitems } = context;

  let history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')){
        getitems();
    }
    else{
        history.push("/signin")
    }
    // eslint-disable-next-line
}, [])

  return (
    <>
      <div className="row">
      {items.length === 0 ? (
        <p className="text-center mt-3">No items to display</p>
      ) : (
        items.map((item) => (
          <Card key={item._id} item={item} title={item.title} price={item.price} />
        ))
      )}
    </div>
    </>
  );
}

export default Viewitems;
