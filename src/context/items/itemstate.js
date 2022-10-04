import Itemcontext from "./itemcontext";
import { useState } from "react";

const Itemstate = (props) => {
  const host = "http://localhost:5000";
  const itemsintial = [];
  const [items, setitems] = useState(itemsintial);

  //Add an item
  const additem = async (title,price) => {
    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price})
    });

    const json = await response.json();
    setitems(items.concat(json))
  };


  // GET all items
  const getitems = async () => {
    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/items/allitems`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();
    //This console prints in chrome console.
    // console.log(json);
    setitems(json);
  };

  const deleteitem = async(id)=>{
    const response = await fetch(`${host}/api/items/deleteitem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json);

    //logic to delete note
    const newitems = items.filter((item) => { return item._id !== id });
    setitems(newitems);

  }

  return <Itemcontext.Provider value={{items,getitems,additem,deleteitem}}>{props.children}</Itemcontext.Provider>;
};

export default Itemstate;
