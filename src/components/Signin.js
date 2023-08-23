import React ,{useState}from "react";
import { useHistory } from 'react-router-dom';

const Signin = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})

    let history = useHistory();

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]: e.target.value})
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        //API Call(syntax gathered from internet)
        const response = await fetch("http://localhost:5000/api/auth/signin", {
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