import React, { useContext, useEffect } from "react";
import Card from "./Card";
import itemcontext from "../context/items/itemcontext";

function Viewitems(props) {
  const context = useContext(itemcontext);
  const { items, getitems } = context;


  useEffect(() => {
    getitems();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="row">
        {items.map((item) => {
          return <Card key={item._id}  title={item.title} price={item.price}/>;
        })}
      </div>
    </>
  );
}

export default Viewitems;
