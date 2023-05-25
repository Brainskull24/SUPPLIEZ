import React, {useState} from "react"
import "../../styles/login.css"
import axios from "axios"
import { useLocation, useNavigate} from "react-router-dom"
import { useAuth } from "../../context/auth";
import Layout from "../../components/Layout/Home/Layout";

const Login = () => {
    const [ user, setUser] = useState({
        email:"",
        password:""
    })
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        axios.post("http://localhost:9002/api/v1/auth/login", user)
        .then(res => {
            alert(res.data.message)
            setAuth({
                ...auth,
                user: res.data.user,
                token: res.data.token,
              });
            localStorage.setItem("auth", JSON.stringify(res.data));
            navigate(location.state || "/");
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <main style={{ minHeight: "110vh" }} >
        <Layout>
        <div className="wrapper">
        <div className="title-text">
           <div className="title login">
               <h1> Login </h1>
           </div>
        </div>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={() => {
                navigate("/forgot-password");
            }}>Forgot Password</div>
            <div className="button" onClick={login}>Login</div>
            {/* <div className="button" onClick={() => navigate("/register")}>Register</div> */}
     </div>
        </Layout>
     </main>    
    )
}

export default Login