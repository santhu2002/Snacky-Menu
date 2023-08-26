import Itemcontext from "./itemcontext";
import { useState } from "react";

const Itemstate = (props) => {
  const host = "http://localhost:5000";
  const itemsintial = [];
  const [items, setitems] = useState(itemsintial);
  const [User, setUser] = useState("Guest");

  //Add an item
  const additem = async (title,price) => {
    //API Call(syntax gathered from internet)
    const response = await fetch(`${host}/api/items/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token')
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
        'auth-token': localStorage.getItem('token')
      },
    });

    const json = await response.json();
    //This console prints in chrome console.
    // console.log(json);
    setitems(json);
  };

  // updating a note
  // const updateitem= async(id)=>{
  //   const response = await fetch(`${host}/api/items/updateitem/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const json = await response.json()
  // }

  //deleting a note
  const deleteitem = async(id)=>{
    const response = await fetch(`${host}/api/items/deleteitem/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        'auth-token': localStorage.getItem('token')
      },
    });
    // eslint-disable-next-line
    const json = await response.json();
    // console.log(json);

    //logic to delete note
    const newitems = items.filter((item) => { return item._id !== id });
    setitems(newitems);

  }

  const getuser = async () => {
    //API Call(syntax gathered from internet)
    const response = await fetch("http://localhost:5000/api/auth/getuser", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
        },
    });
    const json = await response.json();
    setUser(json.name);
    // console.log(json)
  }

  return <Itemcontext.Provider value={{items,User,setUser,getitems,additem,deleteitem,getuser}}>{props.children}</Itemcontext.Provider>;
};

export default Itemstate;
