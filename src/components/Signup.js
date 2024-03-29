import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom';
import itemcontext from "../context/items/itemcontext";

const Signup = (props) => {
    const context = useContext(itemcontext);
    const {getuser } = context;

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" })

    let history = useHistory();
    

    const onChange = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        //API Call(syntax gathered from internet)
        const response = await fetch("https://snackymenu-backend.onrender.com/api/auth/signup", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)

        if(json.success){
            //Save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            history.push("/");
            alert("Account created Successfully ")
            getuser();
            props.setIsLoggedIn(true);

        }
        else{
            alert("Invalid Credentials")
        }
    }

    return (
        <div className="container">
            <h2 className='my-3'>Create An Account To Continue Snacky Menu App</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" onChange={onChange} name='name' id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" onChange={onChange} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} name='password' id="password" minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" onChange={onChange} name='cpassword' id="cpassword" />
                </div>
                <button type="submit" className="btn btn-primary">Sign up</button>
            </form>
        </div>

    );
};

export default Signup;
