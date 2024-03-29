import React,{useContext,useEffect} from "react";
import { Link,useHistory } from "react-router-dom";
import itemcontext from "../context/items/itemcontext";

function Navbar(props) {
  const context = useContext(itemcontext);
  const {User,setUser,getuser} = context;

  let history = useHistory();
  const handlelogout =()=>{
    localStorage.removeItem('token');
    props.setIsLoggedIn(false);
    setUser("Guest")
    history.push('/signin')
  }

  useEffect(() => {
    if(localStorage.getItem('token')){
      getuser();
    }
    else{
      setUser("Guest")
    }
    // eslint-disable-next-line
  }, [])
  
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
              <li className="nav-item">
                <Link className="nav-link active" to="/calculator">
                  Calculator
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/ViewBills">
                  View Bills
                </Link>
              </li>
            </ul>
              {!props.isLoggedIn?<form className="d-flex">
                    <Link role="button" to="/signin" className="btn btn-primary mx-1">Login</Link>
                    <Link role="button" to="/signup"className="btn btn-primary mx-1">Sign up</Link>
                </form>:<button onClick={handlelogout} className="btn btn-primary mx-1">Logout</button> }
          </div>
          <h4 className="mx-4">Hello {User}</h4>
          <button type="button" onClick={props.swapcolor} className="btn btn-secondary">Mode Change</button>
        </div>
      </nav>

    </>
  );
}

export default Navbar;
