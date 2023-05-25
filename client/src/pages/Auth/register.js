import React, { useState } from "react"
import "../../styles/register.css"
import axios from "axios"
import {useNavigate } from "react-router-dom"
import Navbar from "../../components/Layout/Home/Navbar"

const Register = () => {
    const history = useNavigate()
    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: "",
        age:"",
        Contact:"",
        address:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = () => {
        const { name, email, password, reEnterPassword,age,Contact,address } = user
        if( name && email && password && (password === reEnterPassword) && age && Contact && address){
            axios.post("http://localhost:9002/api/v1/auth/register", user)
            .then( res => {
                alert(res.data.message)
                history("/login");
            })
        } 
        else {
            alert("invlid input")
        }   
    }
    return (
        <main style={{ minHeight: "110vh" }} >
        <Navbar></Navbar>
        <div className="register">
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type ="Number" name="age" value = {user.age} placeholder="Your age" onChange={handleChange}></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <input type="Number" name="Contact" value={user.Contact} placeholder="Enter your contact" onChange={ handleChange }></input>
            <input type="text" name="address" value={user.address} placeholder="Enter your Address" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div className="button" onClick={() => history("/login")} >Login</div>
        </div>
        </main>
    )
}

export default Register