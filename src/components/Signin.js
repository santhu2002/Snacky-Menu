import React ,{useState,useContext}from "react";
import { useHistory } from 'react-router-dom';
import itemcontext from "../context/items/itemcontext";

const Signin = (props) => {
    const context = useContext(itemcontext);
    const {getuser } = context;

    const [credentials, setcredentials] = useState({email:"",password:""})

    let history = useHistory();

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]: e.target.value})
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        //API Call(syntax gathered from internet)
        const response = await fetch("https://snackymenu-backend.onrender.com/api/auth/signin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        console.log(json)

        if(json.success){
            //Save the authtoken and redirect
            localStorage.setItem('token',json.authtoken);
            alert("Logged in Successfully")
            getuser();
            history.push("/");
            props.setIsLoggedIn(true);
            // window.location.reload();
            
        }
        else{
            alert("Invalid Credentials")
        }
    }
    return (
        <div>
            <h2 className='my-3'>Login To Continue Snacky Menu App</h2>
            <form onSubmit={handlesubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input type="email" className="form-control" id="email" value={credentials.email} name='email'onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name='password' id="password" />
                </div>

                <button type="submit"  className="btn btn-primary">
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Signin;
