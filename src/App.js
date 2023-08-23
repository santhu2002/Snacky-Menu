import "./App.css";
import Navbar from "./components/Navbar";
import Mainpage from "./components/Mainpage";
import Viewitems from "./components/Viewitems";
import Itemstate from "./context/items/itemstate";
import Calculater from "./components/Calculator"
import Signin from "./components/Signin"
import Signup from "./components/Signup"

import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [mode, setmode] = useState("light");
  const swapcolor = () => {
    if (mode === "light") {
      setmode("dark");
      document.body.style.backgroundColor = "black";
    } else {
      setmode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));

  return (
    <Itemstate>
      <Router>
        <Navbar mode={mode} swapcolor={swapcolor} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Mainpage />
            </Route>
            <Route exact path="/viewitems">
              <Viewitems />
            </Route>
            <Route exact path="/calculator">
              <Calculater />
            </Route>
            <Route exact path="/signup">
              <Signup setIsLoggedIn={setIsLoggedIn} />
            </Route>
            <Route exact path="/signin">
              <Signin setIsLoggedIn={setIsLoggedIn} />
            </Route>
          </Switch>
        </div>
      </Router>
    </Itemstate>
  );
}

export default App;
